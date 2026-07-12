import { useEffect, useState } from "react";
import "./App.css";

const TECH_STACK = [
  "React",
  "FastAPI",
  "Docker",
  "Nginx",
  "Prometheus",
  "Grafana",
];

function initials(title = "") {
  return title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function App() {
  const [showPopup, setShowPopup] = useState(true);

  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [moviesError, setMoviesError] = useState(false);
  const [failedPosters, setFailedPosters] = useState(() => new Set());

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [showAbout, setShowAbout] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch("/api/movies/")
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch(() => setMoviesError(true))
      .finally(() => setMoviesLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/info/")
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch(() => setInfo(null));
  }, []);

  const markPosterFailed = (id) =>
    setFailedPosters((prev) => new Set(prev).add(id));

  /* ================= PIRACY DISCLAIMER ================= */

  if (showPopup) {
    return (
      <div className="overlay">
        <div className="ticket-modal">
          <div className="ticket-modal-perf" aria-hidden="true" />
          <span className="reel-icon" aria-hidden="true">
            🎬
          </span>
          <h2>Before the show starts</h2>

          <p>
            TimePass Streaming is a personal, educational project built to
            demonstrate full-stack and DevOps engineering — not a piracy
            platform.
          </p>
          <p>
            It does not support or promote the distribution of illegal
            content. A small handful of sample titles are hosted purely to
            demonstrate the streaming pipeline.
          </p>
          <p className="fine-print">All rights belong to their respective owners.</p>

          <button className="btn-primary" onClick={() => setShowPopup(false)}>
            Continue to site
          </button>
        </div>
      </div>
    );
  }

  /* ================= ABOUT PAGE ================= */

  if (showAbout) {
    return (
      <div className="page">
        <header className="topbar">
          <button className="btn-ghost" onClick={() => setShowAbout(false)}>
            ← Back to catalog
          </button>
        </header>

        <main className="about-wrap">
          {!info ? (
            <ReelSpinner label="Loading credits…" />
          ) : (
            <>
              <p className="eyebrow">Behind the scenes</p>
              <h1 className="display-title">{info.project}</h1>
              {info.status && <span className="status-pill">{info.status}</span>}

              <p className="about-lead">{info.description}</p>
              {info.msg && <p className="about-body">{info.msg}</p>}

              <div className="stack-block">
                <p className="eyebrow eyebrow-tight">Built with</p>
                <div className="badge-row">
                  {TECH_STACK.map((tech) => (
                    <span className="badge" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {info.contact && (
                <div className="contact-block">
                  <p className="eyebrow eyebrow-tight">Get in touch</p>
                  <a className="contact-link" href={`mailto:${info.contact}`}>
                    {info.contact}
                  </a>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    );
  }

  /* ================= VIDEO PLAYER ================= */

  if (selectedMovie) {
    return (
      <div className="page">
        <header className="topbar">
          <button className="btn-ghost" onClick={() => setSelectedMovie(null)}>
            ← Back to catalog
          </button>
        </header>

        <main className="player-wrap">
          <p className="eyebrow">Now playing</p>
          <h1 className="display-title player-title">{selectedMovie.title}</h1>

          <div className="player-frame">
            <video controls autoPlay>
              <source src={selectedMovie.stream_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </main>
      </div>
    );
  }

  /* ================= HOME PAGE ================= */

  return (
    <div className="page">
      <header className="marquee">
        <div className="brand">
          <span className="reel-icon" aria-hidden="true">
            🎬
          </span>
          <span className="brand-name">TimePass</span>
          <span className="brand-tag">Streaming</span>
        </div>

        <button className="btn-ghost" onClick={() => setShowAbout(true)}>
          About
        </button>
      </header>

      <main className="catalog">
        <div className="catalog-heading">
          <p className="eyebrow">Now showing</p>
          <h1 className="display-title">
            {moviesLoading
              ? "Loading the reel…"
              : `${movies.length} title${movies.length === 1 ? "" : "s"} in rotation`}
          </h1>
        </div>

        {moviesLoading && <ReelSpinner label="Fetching catalog…" />}

        {!moviesLoading && moviesError && (
          <div className="empty-state">
            <p>Couldn't load the catalog right now.</p>
            <p className="empty-sub">Try refreshing in a moment.</p>
          </div>
        )}

        {!moviesLoading && !moviesError && movies.length === 0 && (
          <div className="empty-state">
            <p>No titles are showing yet.</p>
            <p className="empty-sub">Check back soon.</p>
          </div>
        )}

        {!moviesLoading && !moviesError && movies.length > 0 && (
          <div className="grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="ticket-card"
                role="button"
                tabIndex={0}
                onClick={() => setSelectedMovie(movie)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedMovie(movie);
                  }
                }}
              >
                <div className="ticket-poster">
                  {failedPosters.has(movie.id) ? (
                    <div className="poster-fallback">
                      <span>{initials(movie.title) || "🎞️"}</span>
                    </div>
                  ) : (
                    <img
                      src={movie.poster_url}
                      alt={movie.title}
                      loading="lazy"
                      onError={() => markPosterFailed(movie.id)}
                    />
                  )}
                  <div className="play-badge" aria-hidden="true">
                    <span>▶</span>
                  </div>
                </div>

                <div className="ticket-stub">
                  <span className="ticket-title">{movie.title}</span>
                  <span className="ticket-cta">Play</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <span>Built with React · FastAPI · Docker · Nginx</span>
      </footer>
    </div>
  );
}

function ReelSpinner({ label }) {
  return (
    <div className="reel-spinner-wrap">
      <div className="reel-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default App;
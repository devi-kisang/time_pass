import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("/api/movies")
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        setLoading(false);
      });
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h1 className="title">🎬 TimePass Streaming</h1>

      <input
        type="text"
        placeholder="Search movies..."
        className="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p className="message">Loading movies...</p>}

      {!loading && filteredMovies.length === 0 && (
        <p className="message">No movies found.</p>
      )}

      <div className="grid">
        {filteredMovies.map(movie => (
          <div
            key={movie.id}
            className="card"
            onClick={() => setSelectedMovie(movie)}
          >
            <div className="thumbnail">▶</div>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setSelectedMovie(null)}>Close</button>
            <video
              controls
              autoPlay
              width="100%"
              src={`/videos/${selectedMovie.filename}`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("/api/movies/")
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(() => console.error("Failed to fetch movies"));
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>🎬 My Movies</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {movies.map(movie => (
          <li
            key={movie.id}
            style={{
              padding: "10px",
              cursor: "pointer",
              borderBottom: "1px solid #ccc"
            }}
            onClick={() => setSelectedMovie(movie)}
          >
            ▶ {movie.title}
          </li>
        ))}
      </ul>

      {selectedMovie && (
        <div style={{ marginTop: "30px" }}>
          <h2>Now Playing: {selectedMovie.title}</h2>
          <video
            src={selectedMovie.stream_url}
            controls
            autoPlay
            width="800"
          />
        </div>
      )}
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
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

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🎬 TimePass Streaming</h1>

      {loading && <p>Loading movies...</p>}

      {!loading && movies.length === 0 && (
        <p>No movies available.</p>
      )}

      <div style={styles.grid}>
        {movies.map(movie => (
          <div
            key={movie.id}
            style={styles.card}
            onClick={() => setSelectedMovie(movie)}
          >
            <div style={styles.thumbnail}>
              ▶
            </div>
            <h3>{movie.title}</h3>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
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

const styles = {
  page: {
    backgroundColor: "#121212",
    minHeight: "100vh",
    color: "white",
    padding: "40px"
  },
  title: {
    textAlign: "center",
    marginBottom: "40px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px"
  },
  card: {
    backgroundColor: "#1f1f1f",
    padding: "20px",
    borderRadius: "10px",
    cursor: "pointer",
    textAlign: "center",
    transition: "0.3s"
  },
  thumbnail: {
    height: "120px",
    backgroundColor: "#333",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "40px",
    borderRadius: "8px",
    marginBottom: "10px"
  },
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    backgroundColor: "#1f1f1f",
    padding: "20px",
    width: "80%",
    borderRadius: "10px"
  }
};

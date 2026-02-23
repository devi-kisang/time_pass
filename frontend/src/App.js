import { useEffect, useState } from "react";

function App() {

  const [page, setPage] = useState("home")
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    fetch("/api/movies/")
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [])


  // ==============================
  // Movie Player Page
  // ==============================

  if (selectedMovie) {
    return (
      <div style={{ background: "#111", minHeight: "100vh", color: "white" }}>

        <Navbar setPage={setPage} setSelectedMovie={setSelectedMovie} />

        <div style={{ textAlign: "center", padding: "40px" }}>
          <h1>{selectedMovie.title}</h1>

          <video
            controls
            autoPlay
            width="900"
            style={{ borderRadius: "10px" }}
          >
            <source
              src={selectedMovie.stream_url}
              type="video/mp4"
            />
          </video>
        </div>

      </div>
    )
  }


  // ==============================
  // About Page
  // ==============================

  if (page === "about") {
    return (
      <div style={{ background: "#111", minHeight: "100vh", color: "white" }}>

        <Navbar setPage={setPage} setSelectedMovie={setSelectedMovie} />

        <div style={{ padding: "40px", maxWidth: "900px" }}>

          <h1>About This Project</h1>

          <p>
            <strong>TimePass Streaming</strong> is a self-hosted video streaming
            platform built to demonstrate Full Stack and DevOps engineering skills.
          </p>

          <p>
            This project showcases:
          </p>

          <ul>
            <li>FastAPI backend</li>
            <li>React (Vite) frontend</li>
            <li>Docker & Docker Compose</li>
            <li>CI/CD using GitHub Actions</li>
            <li>Nginx reverse proxy with HTTPS</li>
            <li>Prometheus & Grafana monitoring</li>
            <li>Deployment on Azure VM</li>
          </ul>

          <p>
            ⚠️ This website is created for demonstration purposes only.
            It is not a commercial streaming platform and does not promote
            or distribute copyrighted content.
          </p>

          <p>
            For any queries:
          </p>

          <p>
            📧 divyajeetsinhsolanki3112@gmail.com
          </p>

        </div>

      </div>
    )
  }


  // ==============================
  // Home Page
  // ==============================

  return (

    <div style={{ background: "#111", minHeight: "100vh", color: "white" }}>

      <Navbar setPage={setPage} setSelectedMovie={setSelectedMovie} />

      <div style={{ padding: "20px" }}>
        <h1>🎬 TimePass Streaming</h1>
      </div>

      <div style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        flexWrap: "wrap"
      }}>

        {movies.map(movie => (

          <div
            key={movie.id}
            style={{ cursor: "pointer", width: "200px" }}
            onClick={() => setSelectedMovie(movie)}
          >

            <img
              src={movie.poster_url}
              width="200"
              style={{ borderRadius: "10px" }}
            />

            <h3>{movie.title}</h3>

          </div>

        ))}

      </div>

    </div>
  )
}


// ==============================
// Navbar Component
// ==============================

function Navbar({ setPage, setSelectedMovie }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "20px",
      borderBottom: "1px solid #333"
    }}>

      <div style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedMovie(null)
          setPage("home")
        }}>
        Home
      </div>

      <div style={{ cursor: "pointer" }}
        onClick={() => {
          setSelectedMovie(null)
          setPage("about")
        }}>
        About
      </div>

    </div>
  )
}

export default App
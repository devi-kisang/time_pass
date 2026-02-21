import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [movies,setMovies] = useState([]);
  const [selectedMovie,setSelectedMovie] = useState(null);
  const [search,setSearch] = useState("");

  useEffect(() => {

    fetch("/api/movies/")
      .then(res=>res.json())
      .then(data=>setMovies(data));

  },[]);


  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="container">

      <header className="header">
        <h1>🎬 TimePass Streaming</h1>

        <input
          placeholder="Search movies..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </header>

      <div className="grid">

        {filteredMovies.map(movie => (

          <div
            className="card"
            key={movie.id}
            onClick={()=>setSelectedMovie(movie)}
          >

            <img
              src={`/posters/${movie.filename}.jpg`}
              alt={movie.title}
            />

            <p>{movie.title}</p>

          </div>

        ))}

      </div>


      {selectedMovie && (

        <div className="modal">

          <div className="player">

            <h2>{selectedMovie.title}</h2>

            <video
              src={selectedMovie.stream_url}
              controls
              autoPlay
            />

            <button onClick={()=>setSelectedMovie(null)}>
              Close
            </button>

          </div>

        </div>

      )}

    </div>
  );

}

export default App;
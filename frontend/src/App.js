import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function Home({ movies, setSelectedMovie }) {

  return (
    <div style={{
      background:"#111",
      minHeight:"100vh",
      color:"white"
    }}>

      <h1 style={{ padding:"20px" }}>
        🎬 TimePass Streaming
      </h1>

      <div style={{
        display:"flex",
        gap:"20px",
        padding:"20px",
        flexWrap:"wrap"
      }}>

        {movies.map(movie => (

          <div
            key={movie.id}
            style={{
              cursor:"pointer",
              width:"200px"
            }}
            onClick={()=>setSelectedMovie(movie)}
          >

            <img
              src={movie.poster_url}
              width="200"
              style={{ borderRadius:"10px" }}
            />

            <h3>{movie.title}</h3>

          </div>

        ))}

      </div>

    </div>
  );
}


function Player({ selectedMovie, setSelectedMovie }) {

  if(!selectedMovie){
    return (
      <div style={{color:"white",padding:"50px"}}>
        Select a movie first
      </div>
    )
  }

  return(

    <div style={{background:"#111",height:"100vh",color:"white"}}>

      <button
        onClick={()=>setSelectedMovie(null)}
        style={{
          margin:"20px",
          padding:"10px",
          fontSize:"16px"
        }}
      >
        ← Back
      </button>

      <div style={{textAlign:"center"}}>

        <h1>{selectedMovie.title}</h1>

        <video
          controls
          autoPlay
          width="900"
          style={{borderRadius:"10px"}}
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


function About(){

  return(

    <div style={{
      background:"#111",
      color:"white",
      minHeight:"100vh",
      padding:"40px",
      maxWidth:"900px"
    }}>

      <h1>About This Project</h1>

      <p>

      This website is a personal DevOps and full-stack project built
      and maintained by <b>Divyajeetsinh Solanki</b>.

      </p>

      <p>

      The platform demonstrates real-world skills including:

      </p>

      <ul>

        <li>Docker containerization</li>
        <li>CI/CD pipelines</li>
        <li>Cloud deployment</li>
        <li>Nginx reverse proxy</li>
        <li>Monitoring with Prometheus & Grafana</li>

      </ul>

      <p>

      This website is <b>not a commercial streaming platform</b>.

      It is a learning project created to demonstrate technical skills.

      </p>

      <p>

      Only a few videos are hosted for demonstration purposes.

      This project does not support or promote piracy.

      </p>

      <h3>Contact</h3>

      <p>

      Email:
      divyajeetsinhsolanki3112@gmail.com

      </p>

      <p>

      Website:
      kisang.tech

      </p>

    </div>

  )

}



function App() {

  const [movies,setMovies] = useState([])
  const [selectedMovie,setSelectedMovie] = useState(null)


  useEffect(()=>{

    fetch("/api/movies/")
      .then(res=>res.json())
      .then(data=>setMovies(data))

  },[])



  return (

    <Router>

      <div style={{
        background:"#000",
        padding:"10px",
        display:"flex",
        justifyContent:"space-between"
      }}>

        <Link to="/" style={{color:"white"}}>
          Home
        </Link>

        <Link to="/about" style={{color:"white"}}>
          About
        </Link>

      </div>


      <Routes>

        <Route
          path="/"
          element={
            selectedMovie ?
            <Player
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
            />
            :
            <Home
              movies={movies}
              setSelectedMovie={setSelectedMovie}
            />
          }
        />

        <Route
          path="/about"
          element={<About/>}
        />

      </Routes>

    </Router>

  )

}

export default App
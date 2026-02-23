import { useEffect, useState } from "react";

function App() {

  const [movies,setMovies] = useState([])
  const [selectedMovie,setSelectedMovie] = useState(null)

  const [showAbout,setShowAbout] = useState(false)
  const [info,setInfo] = useState(null)


  useEffect(()=>{

    fetch("/api/movies/")
      .then(res=>res.json())
      .then(data=>setMovies(data))

  },[])


  useEffect(()=>{

    fetch("/api/info/")
      .then(res=>res.json())
      .then(data=>setInfo(data))

  },[])



/* ================= ABOUT PAGE ================= */

  if(showAbout && info){

    return(

      <div style={{
        background:"#111",
        minHeight:"100vh",
        color:"white",
        padding:"40px"
      }}>

        <button
          onClick={()=>setShowAbout(false)}
          style={{
            padding:"10px",
            fontSize:"16px"
          }}
        >
          ← Back
        </button>

        <h1>About Project</h1>

        <h2>{info.project}</h2>

        <p>{info.description}</p>

        <p>Status: {info.status}</p>

        <p>Author: {info.author}</p>

        <p>Contact: {info.contact}</p>

      </div>

    )

  }


/* ================= VIDEO PLAYER ================= */

  if(selectedMovie){

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


/* ================= HOME PAGE ================= */

  return (

    <div style={{
      background:"#111",
      minHeight:"100vh",
      color:"white"
    }}>

      <div style={{
        display:"flex",
        justifyContent:"space-between",
        padding:"20px"
      }}>

        <h1>
          🎬 TimePass Streaming
        </h1>

        <button
          onClick={()=>setShowAbout(true)}
          style={{
            padding:"10px",
            fontSize:"16px"
          }}
        >
          About
        </button>

      </div>


      <div style={{
        display:"flex",
        gap:"20px",
        padding:"20px",
        flexWrap:"wrap"
      }}>


        {movies.map(movie=>(

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
              style={{
                borderRadius:"10px"
              }}
            />

            <h3>{movie.title}</h3>

          </div>

        ))}


      </div>

    </div>

  )

}

export default App
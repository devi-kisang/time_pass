import { useEffect, useState } from "react";

function App() {

  const [movies,setMovies] = useState([])
  const [selectedMovie,setSelectedMovie] = useState(null)

  useEffect(()=>{

    fetch("/api/movies/")
      .then(res=>res.json())
      .then(data=>setMovies(data))

  },[])


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


  return (

    <div style={{
      background:"#111",
      minHeight:"100vh",
      color:"white"
    }}>

      <h1 style={{
        padding:"20px"
      }}>
        🎬 TimePass Streaming
      </h1>


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
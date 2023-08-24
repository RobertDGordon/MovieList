import { useState, useEffect} from 'react'
import { BasicCard } from './Card'
import { Box } from '@mui/material'

export default function MyFavoriteMovies() {
  const [movies, setMovies] = useState([])
  
  useEffect(() => {
    //get user id from session storage
    const userId = sessionStorage.getItem("id")
    //get movie array from user endpoint
    fetch(`http://localhost:8000/api/users/${userId}`)
      .then((response) => response.json())
      .then((json) => {
        //extract movie array and call the API
        const movie_ids = json.data[0].movie_ids
        fetch(`http://localhost:8000/api/movies/list/`, {
          method: "POST",
          body: JSON.stringify({movie_ids: movie_ids}),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
        .then((response) => response.json())
        .then((json) => {
          // update state to response from, API
          setMovies(json.data)
        })
      })
  }, [])

  return(
    <>
      <Box
        sx={{
          margin: 10
        }}
      >
      My Favorite Movies: {movies.length}
      {movies.map((movie) => (
        <BasicCard key={movie.id} movie={movie} />
      ))}
      </Box>
    </>
  )
}
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
        // console.log("Repsonse:", json),
        // setMovies(json.data[0].movie_ids),
        const movie_id = json.data[0].movie_ids[0]
        fetch(`http://localhost:8000/api/movies/${movie_id}`)
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
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
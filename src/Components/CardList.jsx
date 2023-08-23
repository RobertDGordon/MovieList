import { useContext } from 'react'
import { MovieDataContext } from '../MovieDataContext'
import { BasicCard } from './Card'
import { Box } from '@mui/material'

export default function CardList() {
  
  const movies = useContext(MovieDataContext)

  return(
    <>
      <Box
        sx={{
          margin: 10
        }}
      >
      Movies: {movies.length}
      {movies.map((movie) => (
        <BasicCard key={movie.id} movie={movie} />
      ))}
      </Box>
    </>
  )
}
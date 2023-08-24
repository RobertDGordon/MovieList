/* eslint-disable react/prop-types */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia'
import { useState } from 'react';

// import {
//   Box,
//   Card,
//   CardActions,
//   CardContent,
//   Button,
//   Typography,
// } from "@mui/material";

export const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export function BasicCard(props) {
  const { movie } = props;
  const [saved, setSaved] = useState(false)
  
  const handleFavorite = (e) => {
    e.preventDefault();
  
    console.log(movie.id);

    const data = {
      movie_ids: [movie.id]
    }

    const userId = sessionStorage.getItem("id")

    fetch(`http://localhost:8000/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if(json.success){
          //if response success = true
          console.log("TODO: something")
          setSaved(true)
        } else {
          console.log("Error:", json.message)
        }
      });
  };
  return (
    <Card sx={{ minWidth: 275, margin: 5 }}>
      <CardMedia
        sx={{
          height: 500
        }}
        image={movie.image}
        title={`Movie poster for ${movie.title}`}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Movie Title:
        </Typography>
        <Typography variant="h5" component="div">
          {movie.title}
        </Typography>

        <Typography variant="body2">
          {movie.synopsis}
        </Typography>
      </CardContent>
      <CardActions
        sx={{justifyContent: "right"}}
      >
        <Button size="small" onClick={handleFavorite}>{saved ? "Saved!" : "Add To Favorites"}</Button>
      </CardActions>
    </Card>
  );
}

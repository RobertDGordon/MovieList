import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [image, setImage] = useState("");

  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      synopsis,
      image,
    };

    console.log(data);

    fetch("http://localhost:3000/api/addMovie", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.result);
      });

    navigate('/card')
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        minWidth: 350,
        p: 3,
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        name="title"
        label="Title"
        variant="outlined"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <TextField
        id="outlined-basic"
        name="synopsis"
        label="Synopsis"
        variant="outlined"
        onChange={(e) => setSynopsis(e.target.value)}
        value={synopsis}
      />
      <TextField
        id="outlined-basic"
        name="image"
        label="Image"
        variant="outlined"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}

import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    };

    console.log(data);

    fetch("http://localhost:8000/api/auth/signup", {
      method: "POST",
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
          sessionStorage.setItem("authenticated", json.success)
          sessionStorage.setItem("id", json.data[0].id)
          navigate("/movies")
        } else {
          setError(json.message)
        }
      });
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
        name="email"
        label="email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <TextField
        type="password"
        name="password"
        label="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      {error ? (<Typography color="red">{error}</Typography>) : null}
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}

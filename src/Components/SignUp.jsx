import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  let navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      firstName,
      lastName,
      password
    };

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
          // NOTE: look at the response from the API, it does not return json.data as an array
          sessionStorage.setItem("authenticated", json.success) //this sets the login auth to true so the user doesn't have to login after signing up
          sessionStorage.setItem("id", json.data.id)
          navigate("/movies")
        } else {
          setError(json.message.errors[0].message)
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
      <Typography variant="h6" color="black">Sign Up</Typography>
      <TextField
        id="outlined-basic"
        name="email"
        label="email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        required
        value={email}
      />
      <TextField

        name="firstName"
        label="first name"
        variant="outlined"
        onChange={(e) => setFirstName(e.target.value)}
        required
        value={firstName}
      />
      <TextField

        name="lastName"
        label="last name"
        variant="outlined"
        onChange={(e) => setLastName(e.target.value)}
        required
        value={lastName}
      />
      <TextField
        type="password"
        name="password"
        label="password"
        variant="outlined"
        onChange={(e) => setPassword(e.target.value)}
        required
        value={password}
      />
      {error ? (<Typography color="red">{error}</Typography>) : null}
      <Button onClick={handleSubmit}>Submit</Button>
    </Box>
  );
}

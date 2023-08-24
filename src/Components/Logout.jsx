import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {


  let navigate = useNavigate()

  useEffect(() => {
    // clear all of session storage
    const logout = setTimeout(() => {
      console.log("Logging out...")
      sessionStorage.clear()
      navigate("/")
    }, 3000)

    return () => {
      clearTimeout(logout)
    }

  }, [navigate])
    

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
      <Typography color="black">Logging out in 3 seconds...</Typography>
    </Box>
  );
}

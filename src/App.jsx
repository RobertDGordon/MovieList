import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import CreateForm from "./Components/CreateForm";
import ResponsiveAppBar from "./Components/NavBar";
import { MovieDataContext } from "./MovieDataContext";
import CardList from "./Components/CardList";
import LoginForm from "./Components/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Logout from "./Components/Logout";
import MyFavoriteMovies from "./Components/MyMovies";
import SignUp from "./Components/SignUp";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/movies/")
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
      });
  }, []);

  return (
    <>
      <MovieDataContext.Provider value={data}>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/post" element={<CreateForm />} />
          <Route path="/movies" element={<CardList />} />
          <Route
            path="/my-movies"
            element={
              <PrivateRoute>
                <MyFavoriteMovies />
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </MovieDataContext.Provider>
    </>
  );
}

export default App;

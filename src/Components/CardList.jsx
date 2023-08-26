import { useState, useEffect, useContext } from "react";
import { MovieDataContext } from "../MovieDataContext";
import { BasicCard } from "./Card";
import { Box } from "@mui/material";

export default function CardList() {
  const moviesContext = useContext(MovieDataContext);

  const [movies, setMovies] = useState([]);

  const [filter1, setFilter1] = useState("");
  const [filter2, setFilter2] = useState("");

  const handleFilterChange1 = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    setFilter1(e.target.value);
  };

  const handleFilterChange2 = (e) => {
    e.preventDefault();

    console.log(e.target.value);
    setFilter2(e.target.value);
  };

  const handleFilter = () => {
    const filteredMovies = moviesContext.filter((movie) => {
      // .filter() method returns the item if the expression is returned as true

      // setup list of filter keys to filter by, default is true if they're not selected ignore them
      const filter = {
        byTitle: true,
        byDescription: true,
      };

      //adjust filter keys based on if they're selected, an empty string means it's not selected AKA false in JS
      if (filter1) {
        filter.byTitle = movie.title.toLowerCase().includes(filter1); //this sets a boolean
      }

      if (filter2) {
        filter.byDescription = movie.synopsis.toLowerCase().includes(filter2); //this sets a boolean
      }

      //return a boolean of the following expression
      return filter.byTitle && filter.byDescription;
    });

    setMovies(filteredMovies);
    console.log(filter1, filter2, filteredMovies);
  };

  const clearFilters = () => {
    //reset the movies list to the original
    setMovies(moviesContext);
  };

  useEffect(() => {
    // either use context, or set the movie data by calling the API
    // fetch("http://localhost:8000/api/movies/")
    //   .then((response) => response.json())
    //   .then((json) => {
    //     setMovies(json.data);
    //   });

    setMovies(moviesContext)
  }, []);

  return (
    <>
      <Box
        sx={{
          margin: 10,
          // width: "80%",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <select value={filter1} onChange={(e) => handleFilterChange1(e)}>
          <option value="">-</option>
          <option value="the">Only movies that start with the</option>
        </select>

        <select value={filter2} onChange={(e) => handleFilterChange2(e)}>
          <option value="">-</option>
          <option value="the">description includes the</option>
        </select>
        <button onClick={handleFilter}>Filter</button>
        <button onClick={clearFilters}>Clear Filters</button>
      </Box>
      <Box
        sx={{
          margin: 10,
        }}
      >
        Movies: {movies.length}
        {movies.map((movie) => (
          <BasicCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </>
  );
}

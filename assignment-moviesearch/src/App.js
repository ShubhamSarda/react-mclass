import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  const fetchMovie = async () => {
    const apiKey = "1c6c6b65";
    const url = `https://www.omdbapi.com/?t=${query}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.Response === "True") {
        setMovie(data);
        setError("");
      } else {
        setMovie(null);
        setError(data.Error);
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
      setError("An error occurred while fetching movie data.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMovie();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Search</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter movie title"
            required
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
        {movie && (
          <div className="movie">
            <img
              src={movie.Poster}
              alt={`${movie.Title} Poster`}
              className="movie-poster"
            />
            <div className="movie-details">
              <h2>{movie.Title}</h2>
              <p>
                <strong>Year:</strong> {movie.Year}
              </p>
              <p>
                <strong>Genre:</strong> {movie.Genre}
              </p>
              <p>
                <strong>Director:</strong> {movie.Director}
              </p>
              <p>
                <strong>Actors:</strong> {movie.Actors}
              </p>
              <p>
                <strong>Plot:</strong> {movie.Plot}
              </p>
              <p>
                <strong>IMDb Rating:</strong> {movie.imdbRating}
              </p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;

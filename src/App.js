import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import { useState } from "react";
// c070e852

const API_URL = "http://www.omdbapi.com/?apikey=c070e852&";

function App() {
  document.title="MovieCard"
  const [movies, setMovies] = useState([]);
  const [search,setSearch] =useState('')
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}s=${title}`);
    const data = await response.json();
    
    document.title=`MovieCard- ${title}`;
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies('');
  },[]);
  return (
    <div>
      <h1>MovieEngine</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search for movies"
          value={search}
          onChange={(e) => {setSearch(e.target.value)}}
        />
        <img src={SearchIcon} alt="Search" onClick={() => {searchMovies(search)}} />
      </div>
      <div className="container">
        {movies && movies.length > 0 ? (
          movies.map((movie) => {
            return <MovieCard movie={movie} />;
          })
        ) : (
          <div className="empty">
            <h2>No Movies Found</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

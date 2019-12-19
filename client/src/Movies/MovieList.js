import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";


export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: props
    };
  }

  render() {
    if (!this.props.movies.length) {
      return <h3>Loading...</h3>
    }
    return (
      <div className="movie-list">
      
        {this.props.movies.map(movie => (
          <MovieDetails key={movie.id} movie={movie} movies={this.state.movies} />
        ))}
      </div>
    );
  }
}

function MovieDetails({ movie, movies }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} movies={movies} />
    </Link>
  );
}

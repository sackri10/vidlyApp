import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Favorite from "./Favorite";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
class Movies extends Component {
  state = { movies: getMovies(), currentPage: 1, pageSize: 4 };
  render() {
    if (this.state.movies.length === 0)
      return <label>There are no movies in the DB</label>;
    return (
      <div>
        <div>{this.formatText()}</div>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
        <Pagination
          itemsCount={getMovies().length}
          pageSize={4}
          onPageChange={page => this.handlePagination(page)}
          currentPage={this.state.currentPage}
        ></Pagination>
      </div>
    );
  }
  handlePagination = page => {
    this.setState({ currentPage: page });
  };

  handleDelete(id) {
    console.log(id);
    this.setState({ movies: this.state.movies.filter(m => m._id !== id) });
  }

  formatText() {
    const movieCount = this.state.movies.length;
    const str = movieCount > 0 ? movieCount : "no";
    return <label>There are {str} movies in the DB</label>;
  }

  handleClick = movie => {
    console.log(movie);
    const allMovies = [...this.state.movies];
    const index = allMovies.indexOf(movie);
    allMovies[index] = { ...allMovies[index] };
    allMovies[index].isLiked = !allMovies[index].isLiked;
    console.log(allMovies[index]);
    this.setState({ movies: allMovies });
  };
  renderRows() {
    const { movies, currentPage, pageSize } = this.state;
    const filteredmovies = paginate(movies, currentPage, pageSize);
    const movieRows = filteredmovies.map(movie => {
      return (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            <Favorite
              clickTrigger={() => this.handleClick(movie)}
              isLiked={movie.isLiked}
            ></Favorite>
          </td>
          <td>
            <button
              className="btn-btn btn-danger btn-sm"
              onClick={() => {
                this.handleDelete(movie._id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return movieRows;
  }
}

export default Movies;

import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Favorite from "./Favorite";
import Pagination from "./Pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";
class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
    filterApplied: "All"
  };
  render() {
    const { movies, currentPage, pageSize,filterApplied } = this.state;
    const filteredMovies =
      filterApplied === "All"
        ? movies
        : movies.filter(m => m.genre.name === filterApplied);
    const paginatedMovies = paginate(filteredMovies, currentPage, pageSize);        
    if (this.state.movies.length === 0)
      return <label>There are no movies in the DB</label>;
    return (
      <div>
        <div>{this.formatText()}</div>
        <div className="row">
          <div className="col-2">
            <ListGroup
              lists={getGenres().map(m => m.name)}
              selectedList={this.state.filterApplied}
              handleFilterClick={list => this.handleFilterClick(list)}
              ></ListGroup>
          </div>
          <div className="col-10">
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
              <tbody>{           
    paginatedMovies.map(movie => 
       (
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
          
        </tr>))
  }</tbody>
            </table>
            <Pagination
              itemsCount={filteredMovies.length}
              pageSize={4}
              onPageChange={page => this.handlePagination(page)}
              currentPage={this.state.currentPage}
            ></Pagination>
          </div>
        </div>
      </div>
    );
}
  handlePagination = page => {
    this.setState({ currentPage: page });
  };
  handleFilterClick = list => {
    this.setState({ filterApplied: list });
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

}

export default Movies;

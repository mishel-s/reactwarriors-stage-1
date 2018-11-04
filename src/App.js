import React, { Component } from 'react';
import './App.css';
import { moviesData } from "./moviesData";


class WillWatchMovieItem extends Component {
  render() {
    const { title, vote_average } = this.props;
    return (
      <li className="list-group-item">
        <div className="d-flex justify-content-between">
          <div>{title}</div>
          <div>{vote_average}</div>
        </div>
      </li>
    )
  }
}

class MovieListWillWatch extends Component {
  render() {
    const { willWatchMoviesData } = this.props;
    return (
      <ul className="list-group">
        { willWatchMoviesData 
          ? willWatchMoviesData.map((movie)=> (
              <WillWatchMovieItem 
                key={movie.id}
                title={movie.title}
                vote_average={movie.vote_average}
              />
            ))
          : "Spiner"
        }
      </ul>
    );
  }
}

class MovieItem extends Component {
  constructor() {
    super();
    this.state = {
      willWatch: false,
    }
  }

  toggleWatch = () => {
    this.setState({
      willWatch: !this.state.willWatch
    });
  }

  render() {
    const { 
      data: { backdrop_path, original_title, release_date, vote_average } 
    } = this.props;
    return(
        <div className="card">
          <img className="card-img-top" src={`https://image.tmdb.org/t/p/w500${backdrop_path}`} alt={original_title} />
          <div className="card-body">
            <div className="main--card-title">
              <h5 className="card-title">{original_title}</h5>
            </div>
            <p className="card-text"><i>Release date:</i> <br/>{release_date }</p>
            <div className="d-flex justify-content-between align-items-center">
              <p className="card-text mb-0"><i>Raiting:</i> {vote_average}</p>
              <button 
                type="button"
                onClick={ ()=> {
                            this.props.toggleMoviesWillWatch(this.state.willWatch, this.props.data);
                            this.toggleWatch()
                          }
                        }
                className={this.state.willWatch ? "btn btn-success" : "btn btn-secondary"}
              >
                Will Watch
              </button>
            </div>
          </div>
        </div>
    );
  }
}

class MovieList extends Component {
  render() {
    const { moviesData, toggleMoviesWillWatch } = this.props;
    return (
      <div className="row">
        { moviesData 
          ? moviesData.map((movie)=> (
              <div key={movie.id} className="col-4 mb-4">
                <MovieItem 
                  data={movie} 
                  toggleMoviesWillWatch={toggleMoviesWillWatch}
                />
              </div>
            ))
          : "Spiner"
        }
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      moviesData: moviesData,
      moviesWillWatch: [],
    }
  }

  toggleMoviesWillWatch = (action, movie) => {
    let dataWillWatch = this.state.moviesWillWatch;
    !action 
      ? dataWillWatch.push(movie)
      : dataWillWatch = dataWillWatch.filter(item => {
          return item.id !== movie.id
        });
    this.setState({moviesWillWatch: dataWillWatch});
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <MovieList 
              moviesData={this.state.moviesData}
              toggleMoviesWillWatch={this.toggleMoviesWillWatch}
            />
          </div>
          <div className="col-3">
            <div style={{ position: "fixed" }}>
              <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
              <MovieListWillWatch willWatchMoviesData={this.state.moviesWillWatch} />
              <ul className="list-group"></ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard.js'

class Home extends Component {

    //on component mounting, sends request to redux to get the movie list
    componentDidMount() {
        this.props.dispatch({type: 'GET_MOVIES'})
    }

    render() {
        return(
            <>
                <p>Welcome to Blockbuster!</p>
                {this.props.reduxState.movies.map(movie => (
                    <MovieCard key={movie.id} movie={movie}/>
                ))}
            </>
        );
    };
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
export default connect(mapStateToProps)(Home);
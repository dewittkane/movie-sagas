import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieCard from '../MovieCard/MovieCard.js'
import { Button, Paper, Grid } from '@material-ui/core'

class Home extends Component {

    //on component mounting, sends request to redux to get the movie list
    componentDidMount() {
        this.props.dispatch({type: 'GET_MOVIES'});
    }

    render() {
        return(
            <>
                <h1>Welcome to Blockbuster!</h1>
                <Grid container spacing={8} direction="row" justify="space-around" alignItems="center">
                    {this.props.reduxState.movies.map(movie => (
                        <Paper key={movie.id}>
                            <MovieCard  movie={movie}/>
                        </Paper>
                    ))}
                </Grid>
                <Button variant="contained" color="primary" onClick={() => this.props.history.push('/addmovie')}>Add Movie</Button>
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
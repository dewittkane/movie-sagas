import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card } from '@material-ui/core';
import GenreCard from '../GenreCard/GenreCard'

class Details extends Component {

    componentDidMount() {
        //uses react router params to get id of movie click on
        this.props.dispatch({type: 'GET_DETAILS', payload: this.props.match.params.movieId})
    }

    render() {
        //query brings back multiple instances of the movie due to multiple genres
        //this selects the first one to use for details
        console.log(this.props.reduxState.details[0])
        let movie = this.props.reduxState.details[0]

        return(
            <>
                {/* conditional rendering will not display component until async request to server is complete */}
                {movie && 
                <Card>
                    <h3>{movie.title}</h3>
                    <img alt={movie.title} src={movie.poster} />
                    <div>
                        {this.props.reduxState.details.map(genre => (
                            <GenreCard key={genre.name} genre={genre}/>
                        ))}
                    </div>
                    <p>{movie.description}</p>
                </Card>
                }
                <Button onClick={this.props.history.goBack} variant="contained">Back to List</Button>
            </>
        );
    };
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
export default connect(mapStateToProps)(Details);
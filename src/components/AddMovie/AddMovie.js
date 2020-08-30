import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, MenuItem, TextField } from '@material-ui/core';

class AddMovie extends Component {

    //loads genres to reducer on page load
    componentDidMount() {
        this.props.dispatch({type: 'GET_GENRES'});
    }

    //a place to store input data
    state = {
        title: '',
        posterUrl: '',
        description: '',
        genre_id: ''  
    }

    //stores input data
    handleChangeFor = (propertyName) => (event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        });
      };
    
    //submits "form" on button click
    handleSubmit = () => {
        //checks that all fields are filled out
        if (this.state.title && this.state.posterUrl && this.state.description && this.state.genre_id) {
            this.props.dispatch({type: 'ADD_MOVIE', payload: this.state})
            //resets inputs once dispatch is finished
            this.setState({
                title: '',
                posterUrl: '',
                description: '',
                genre_id: ''
            })
        } else {
            alert("Please fill out all fields.")
        }
    }


    render() {
        return(
            <>
                <Card>
                    <h1>Add a movie!</h1>
                    <div>
                        <TextField fullWidth value={this.state.title} onChange={this.handleChangeFor('title')} type="text" helperText="Title"/>
                    </div>
                    <div>
                        <TextField multiline rowsMax={4} fullWidth value={this.state.posterUrl} onChange={this.handleChangeFor('posterUrl')} type="text" helperText="Image Url"/>
                    </div>
                    <div>
                        <TextField multiline rowsMax={4} fullWidth value={this.state.description} onChange={this.handleChangeFor('description')} type="text" helperText="Description"/>
                    </div>
                    <div>
                        {/* select element that uses the genres from the DB */}
                        <TextField 
                            select
                            label="Genre" 
                            value={this.state.genre_id} 
                            onChange={this.handleChangeFor('genre_id')} 
                            helperText="Please select a genre"
                        >
                            {this.props.reduxState.genres.map(genre => (
                                <MenuItem key={genre.id} value={genre.id}>
                                    {genre.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <Button onClick={this.handleSubmit} variant="contained" color="primary">Submit</Button>
                    <Button onClick={this.props.history.goBack} variant="contained">Back to List</Button>
                </Card>
            </>

        );
    };
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
export default connect(mapStateToProps)(AddMovie);
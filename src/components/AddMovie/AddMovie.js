import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, MenuItem, TextField } from '@material-ui/core';

class AddMovie extends Component {

    //a place to store input data
    state = {
        title: '',
        posterUrl: '',
        description: '',
        genre: ''  
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
        this.props.dispatch({type: 'ADD_MOVIE', payload: this.state})
    }


    render() {
        return(
            <>
                <Card>
                    <div>
                        <TextField fullWidth value={this.state.title} onChange={this.handleChangeFor('title')} type="text" helperText="Title"/>
                    </div>
                    <div>
                        <TextField fullWidth value={this.state.posterUrl} onChange={this.handleChangeFor('posterUrl')} type="text" helperText="Image Url"/>
                    </div>
                    <div>
                        <TextField fullWidth value={this.state.description} onChange={this.handleChangeFor('description')} type="text" helperText="Description"/>
                    </div>
                    <div>
                        <TextField 
                            select
                            label="Genre" 
                            value={this.state.genre} 
                            onChange={this.handleChangeFor('genre')} 
                            helperText="Please select a genre"
                        >
                            {this.props.reduxState.genres.map(genre => (
                                <MenuItem key={genre.id} value={genre.name}>
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
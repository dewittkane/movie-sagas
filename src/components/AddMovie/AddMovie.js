import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card } from '@material-ui/core';

class AddMovie extends Component {
    render() {

        handleSubmit = () => {
            this.props.dispatch({type: 'ADD_MOVIE', })
        }
        return(
            <>
                <Card>

                    <p>Add movie!</p>
                    <Button onClick={this.handleSubmit} variant="contained">Back to List</Button>
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core'

class GenreCard extends Component {
    render() {
        return(
            <Button size="small" variant="outlined" color="primary" disabled >{this.props.genre.name}</Button>
        );
    };
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
export default connect(mapStateToProps)(GenreCard);

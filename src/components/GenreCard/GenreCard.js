import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core'

class GenreCard extends Component {
    render() {
        return(
            //I like the way these look, a stretch goal might be clicking these to show all movies with that genre?
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

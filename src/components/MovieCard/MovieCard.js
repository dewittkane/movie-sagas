import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core'

class MovieCard extends Component {
    handleClick = () => {
        console.log('clicked', this.props.movie.title);
        
    }
    render() {
        return(
            <Card onClick={this.handleClick}>
                <h4>{this.props.movie.title}</h4>
                <img alt={this.props.movie.title} src={this.props.movie.poster}/>
            </Card>
        );
    };
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
export default connect(mapStateToProps)(MovieCard);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core'
import { Link } from 'react-router-dom';

class MovieCard extends Component {
    handleClick = () => {
        console.log('clicked', this.props.movie.title);
    };

    render() {
        return(
                <Card onClick={this.handleClick}>
                    {/* <h4>{this.props.movie.title}</h4> */}
                    {/* when clicking image, you will be directed to details page of that movie */}
                    <Link to={`/details/${this.props.movie.id}`}>
                        <img alt={this.props.movie.title} src={this.props.movie.poster}/>
                    </Link>
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
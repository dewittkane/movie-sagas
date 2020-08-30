import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from '@material-ui/core'
import { Link } from 'react-router-dom';

class MovieCard extends Component {

    render() {
        return(
                <Card>
                    {/* when clicking image, you will be directed to details page of that movie */}
                    <Link to={`/details/${this.props.movie.id}`}>
                        <img height='274px' width='185px' alt={this.props.movie.title} src={this.props.movie.poster}/>
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
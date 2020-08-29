import React, { Component } from 'react';
import { connect } from 'react-redux';

class Details extends Component {
    render() {
        return(
            <p>Details!</p>
        );
    };
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
export default connect(mapStateToProps)(Details);
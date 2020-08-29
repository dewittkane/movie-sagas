import React, { Component } from 'react';
import { connect } from 'react-redux';
class CreatureItem extends Component {
    render() {
        return(
            <p>Home!</p>
        );
    };
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
export default connect(mapStateToProps)(CreatureItem);
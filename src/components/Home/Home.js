import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {

    //on component mounting, sends request to redux to get the movie list
    componentDidMount() {
        this.props.dispatch({type: 'GET_MOVIES'})
    }

    render() {
        return(
            <>
                <p>Home!</p>
                {JSON.stringify(this.props.reduxState.movies)}
            </>
        );
    };
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
export default connect(mapStateToProps)(Home);
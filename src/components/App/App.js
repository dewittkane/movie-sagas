import React, { Component } from 'react';
import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Home from '../Home/Home.js';
import Details from '../Details/Details.js'
import AddMovie from '../AddMovie/AddMovie.js'

class App extends Component {
  // Renders the entire app on the DOM

  render() {
    return (
      <div className="App">
        <h1>Movies!</h1>
        <Router>
          {/* sets up routes for different views */}
          <Route exact path="/" component={Home} />
          <Route path="/details/:movieId" component={Details} /> 
          <Route path="/addmovie" component={AddMovie} />
        </Router>
      </div>
    );
  }
}

export default App;

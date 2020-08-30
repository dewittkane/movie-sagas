import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('GET_MOVIES', getMovies);
    yield takeEvery('GET_DETAILS', getDetails);
    yield takeEvery('GET_GENRES', getGenres);
    yield takeEvery('ADD_MOVIE', addMovie)
}

//saga to get movies from DB and pass to reducer
function* getMovies() {
    try{
        let response = yield axios.get('/api/movie/')
        console.log(response.data);

        yield put({type: 'SET_MOVIES', payload: response.data})
    } catch (error){
        console.log('error in get movies request', error)
    }
}

//saga to get genres from DB and pass to reducer
function* getGenres() {
    try{
        let response = yield axios.get('/api/genre/')
        console.log(response.data);

        yield put({type: 'SET_GENRES', payload: response.data})
    } catch (error){
        console.log('error in get genres request', error)
    }
}

//saga to get movie details from DB based on router param id and pass to reducer
function* getDetails(action) {
    try{
        let response = yield axios.get(`/api/movie/${action.payload}`)
        console.log(response.data);

        yield put({type: 'SET_DETAILS', payload: response.data})
    } catch (error){
        console.log('error in get details request', error)
    }
}

function* addMovie(action) {
    try{
        let response = yield axios.post(`/api/movie/`, action.payload)
        console.log(response.data);

        yield put({type: 'GET_MOVIES'})
    } catch (error){
        console.log('error in add movie request', error)
    }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the selected movies details
//this feels like a lot of work, but i guess it works?
const details = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
            // let movie = action.payload[0];
            // let detailGenres = [];
            // for (const movieWithGenre of action.payload) {
            //     detailGenres.push(movieWithGenre.name)
            // };
            // return {movie: movie, genres: detailGenres};
        default:
            return state;
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>, 
    document.getElementById('root'));
registerServiceWorker();

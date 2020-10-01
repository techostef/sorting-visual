import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import './App.scss';

import "./assets/css/tailwind.css"
import "./assets/css/tailwind-extend.css"

import { Provider } from 'react-redux'
import rootReducer from './store/reducers'
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
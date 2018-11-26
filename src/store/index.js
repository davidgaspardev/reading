/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/store/index.js
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

//const devToolsRedux = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;

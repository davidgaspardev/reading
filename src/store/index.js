/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/store/index.js
 */
import { createStore } from 'redux';
import reducerRoot from '../reducers';

const devToolsRedux = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(reducerRoot ,devToolsRedux);

export default store;

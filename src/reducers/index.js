/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/reducers/index.js
 */
import { combineReducers } from 'redux';
import { ADD_POSTS, ADD_COMMENTS } from '../actions';

const initialState = {
  react: [],
  redux: [],
  udacity: []
}

function posts(state = initialState, actions) {
  const { posts } = actions;

  switch(actions.type) {
    case ADD_POSTS:

      let categories = Object.keys(state);

      for(let i = 0; i < categories.length; i++) {
        state[categories[i]] = state[categories[i]].length <= 0 ? [] : state[categories[i]].filter( item => {
          let isThere = false;

          posts.forEach(itemPost => {
            if(item.id === itemPost.id) isThere = true;
          });

          return !isThere;

        });

        state[categories[i]] = state[categories[i]].concat(posts.filter(({ category }) => category === categories[i]));

      }

      console.log('AQUI: ', state);

      return state;

    default:
      return state;
  }
}

function comments(state = initialState, action) {
  const { comments } = action;

  switch(action.type) {
    case ADD_COMMENTS:
      let categories = Object.keys(state);

      for(let i = 0; i < categories.length; i++) {
        state[categories[i]] = state[categories[i]].length <= 0 ? [] : state[categories[i]].filter( item => {
          let isThere = false;

          comments.forEach(itemPost => {
            if(item.id === itemPost.id) isThere = true;
          });

          return !isThere;

        });

        state[categories[i]] = state[categories[i]].concat(posts.filter(({ category }) => category === categories[i]));

      }

      return state;

    default:
      return state;

  }

}

export default combineReducers({ posts, comments });

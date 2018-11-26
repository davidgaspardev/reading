/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/reducers/index.js
 */
//import { combineReducers } from 'redux';
import { ADD_POST } from '../actions';

const initialPostsState = {
  posts: {
    react: [],
    redux: [],
    udacity: []
  }
}

export default function reducesPost(state = initialPostsState, actions) {

  const { posts } = state;
  const { post  } = actions;

  switch(actions.type) {
    case ADD_POST:

      let categories = Object.keys(posts);

      for(let i = 0; i < categories.length; i++) {
        let postsCurrent = posts[categories[i]];
        postsCurrent = postsCurrent.length <= 0 ? [] : postsCurrent.filter( postCurrent => postCurrent.id !== post.id);
      }

      posts[post.category].push(post);

      //console.log('ADD_POSTS | REDUCER: ', state);

      return { ...state, posts };

    default:
      return state;
  }
}

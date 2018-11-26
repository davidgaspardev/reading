/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/actions/index.js
 */
import { apiPath as path, getData } from '../util/api';

export const ADD_POST    = 'ADD_POST';

export function addPostsAsync() {
  return dispatch => getData(posts => {

    // Get all posts without comments
    posts.forEach(post => {

      // Get comments of the post
      getData(comments => {

        post.comments = comments;

        dispatch(addPost(post));

      }, `${path.POSTS}/${post.id + path.COMMENTS}`);

    });
  }, path.POSTS);
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

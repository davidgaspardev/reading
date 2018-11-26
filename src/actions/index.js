/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/actions/index.js
 */
export const ADD_POSTS    = 'ADD_POSTS';
export const ADD_COMMENTS = 'ADD_COMMENTS';

export function addPosts(posts) {
  return {
    type: ADD_POSTS,
    posts: Array.isArray(posts) ? posts : []
  }
}

export function addComments(comment) {
  return {
    type: ADD_COMMENTS,
    comment: Array.isArray(comment) ? comment : []
  }
}

/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/actions/index.js
 */
const ADD_POSTS = 'ADD_POSTS';
const ADD_COMMENT = 'ADD_COMMENT';

export function addPosts({ id, timestamp, title, body, author, category, voteScore, deleted }) {
  return {
    type: ADD_POSTS,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}

export function addComment({ id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted }) {
  return {
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore,
    deleted,
    parentDeleted
  }
}

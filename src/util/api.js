/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/util/api.js
 */

/* ATTRIBUTES */
const URL    = process.env.API_URL         || 'http://localhost';
const PORT   = process.env.API_PORT        || 3001;
const AUTH   = process.env.API_AUTH        || 'davidgaspardev';
const M_GET  = process.env.API_METHOD_GET  || 'GET';
const M_POST = process.env.API_METHOD_POST || 'POST';

export const apiPath = {
  CATEGORIES: process.env.API_PATH_CATEGORIES || '/categories',
       POSTS: process.env.API_PATH_POSTS      || '/posts',
    COMMENTS: process.env.API_PATH_COMMENTS   || '/comments'
}

/**
 * Main Functions
 * GETTER and SETTER
 */
export function setData(callback, path = apiPath.COMMENTS) {
  apiData(callback, path, M_POST);
}

export function getData(callback, path = apiPath.CATEGORIES) {
  apiData(callback, path, M_GET);
}

async function apiData(callback,  path, method) {

  let resolved, uri, protocol;

  // Building the URI
  uri = buildUri(path);
  console.log('URI: ', uri);

  // Building protocol
  protocol = buildProtocol(method);
  console.log('PROTOCOL: ', protocol);

  // Setting request HTTP
  const response = await fetch(uri, protocol);

  // Getting response HTTP
  if(response.ok) {
    resolved = await response.json();

    typeof callback === 'function' && callback(resolved);

  } else logError(uri, `${response.status} ${response.statusText}`);

}

// To build address
const buildUri = (path) => (`${URL}:${PORT}${path}`);

// To build protocol's header
const buildProtocol = (method) => ({
  headers: { 'Authorization': AUTH },
  method: method
});

// To show the conection error
const logError = (address, status) => {
  console.group('COMMUNCATION FAILED | API');
  console.info('ADDRESS: ', address);
  console.info('STATUS: ', status);
  console.groupEnd('COMMUNCATION FAILED | API');
}

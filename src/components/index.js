/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/components/index.js
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPosts, addComments } from '../actions';
import { apiPath as path, getData } from '../util/api';
import './index.css';

class Root extends Component {

  constructor(props) {
    super(props)

    this.renderCategories = this.renderCategories.bind(this);
  }

  state = {
    categories: Object.keys(this.props.posts)
  }

  renderCategories() {
    const { categories } = this.state;

    if(categories !== null) return categories.map((item, index) => (<h2 key={index} >{item}</h2>));

  }

  render() {
    const { renderCategories, logger } = this;

    logger('ROOT COMPONENT', () => { console.info('Props: ', this.props); console.info('State: ', this.state); });

    return (
      <div>
        <h1>Hello World!</h1>
        { renderCategories() }
      </div>
    );
  }

  componentDidMount() {
    const { insertPosts } = this.props;

    getData((data) => insertPosts(data), path.POSTS);

  }

  logger(title, middleFunction) {
    console.group(title);
    middleFunction();
    console.groupEnd(title);
  }

}

function mapDispatchToProps(dispatch) {
  return {
    insertPosts: (data) => dispatch(addPosts(data)),
    insertComments: (data) => dispatch(addComments(data))
  }
}

function mapStateToProps({ posts, comments }) {
  return {
    posts,
    comments
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

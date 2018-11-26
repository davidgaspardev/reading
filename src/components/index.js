/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/components/index.js
 */
import React, { Component } from 'react';
import { apiPath as path, getData } from '../util/api';
import './index.css';

export default class Root extends Component {

  constructor(props) {
    super(props)

    this.renderCategories = this.renderCategories.bind(this);
  }

  state = {
    categories: null
  }

  renderCategories() {
    const { categories } = this.state;

    if(categories !== null) return categories.map((item, index) => (<h2 key={index} >{item.name}</h2>));

  }

  render() {
    const { renderCategories, logger } = this;

    logger('ROOT COMPONENT', () => {
      console.info('Props: ', this.props);
      console.info('State: ', this.state);
    });

    return (
      <div>
        <h1>Hello World!</h1>
        { renderCategories() }
      </div>
    );
  }

  componentDidMount() {
    const { categories } = this.state;

    // If categories is empty
    if(categories === null) getData(data => { this.setState({ categories: data.categories}) }, path.CATEGORIES);
  }

  logger(title, middleFunction) {
    console.group(title);
    middleFunction();
    console.groupEnd(title);
  }

}

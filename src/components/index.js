/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/components/index.js
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPostsAsync } from '../actions';
import './index.css';

class Root extends Component {

  constructor(props) {
    super(props);

    // Initilize state
    this.state = {
      categories: Object.keys(this.props.posts),
      isLoading: true
    }

    this.renderCategories = this.renderCategories.bind(this);
    this.renderPosts      = this.renderPosts.bind(this);

    this.Header = this.Header.bind(this);
    this.Main   = this.Main.bind(this);

  }

  renderCategories() {
    const { categories } = this.state;

    if(categories !== null) return categories.map((item, index) => (<li key={index} >{item}</li>));

  }

  renderPosts() {
    const { isLoading } = this.state;

    if(isLoading) return (<div className='posts-loading'/>)

  }

  render() {
    const { logger, Header, Main } = this;

    logger('ROOT COMPONENT', () => {
      console.info('Props: ', this.props, '\nState: ', this.state);
    });

    return (
      <div className='backgraund'>
        <Header title='Reading' />
        <Main />
      </div>
    );
  }

  /**
   * ============ Functinal Stateless Components ============
   * Local components(stateless) for UI composition
   */

  Header({ title }) {
    const { renderCategories } = this;

    return (
      <header>
        <h1>{title}</h1>

        <nav>
          <ul> { renderCategories() } </ul>
        </nav>

      </header>
     );
  }

  Main() {
    const { renderPosts } = this;

    return (
      <main>
        { renderPosts() }
      </main>
    );
  }

  componentDidMount() {
    const { getPostsAsync } = this.props;

    getPostsAsync();

  }

  logger(title, middleFunction) {
    console.group(title);
    middleFunction();
    console.groupEnd(title);
  }

}

function mapDispatchToProps(dispatch) {
  return {
    getPostsAsync: () => dispatch(addPostsAsync()),
  }
}

function mapStateToProps({ posts }) {
  return { posts }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);

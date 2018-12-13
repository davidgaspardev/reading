/**
 * Created on November 25, 2018
 * By David Corrêa Gaspar (davidgaspar.dev@gmail.com)
 * Path: PROJECT/src/components/index.js
 */
import React, { PureComponent } from 'react';
import Store from '../store';
//import { connect } from 'react-redux';
import { addPostsAsync } from '../actions';
import thumbsUp from './icons/thumbs-up.svg';
import thumbsDown from './icons/thumbs-down.svg';
import './index.css';

export default class Root extends PureComponent {

  constructor(props) {
    super(props);

    // Initilize state
    this.state = {
      categories: [],
      currentCategory: null,
      posts: null,
      isLoading: true,
      lastUpdate: Date.now()
    }

    Store.subscribe(() => {
      let toUpdate = false, newState = {}, state = Store.getState();

      if(this.state.categories.length !== Object.keys(state.posts).length) {
        newState.categories = Object.keys(state.posts);
        toUpdate = true;
      }

      if(this.posts !== state.posts) {
        newState.posts = state.posts;
        toUpdate = true;
      }

      toUpdate && this.setState({
        ...newState,
        isLoading: false,
        lastUpdate: Date.now()
      });

    });

    this.renderCategories = this.renderCategories.bind(this);
    this.renderPosts      = this.renderPosts.bind(this);
    //this.toFilterList     = this.toFilterList.bind(this);


    //this.Header = this.Header.bind(this);
    //this.Main   = this.Main.bind(this);

  }

  toFilterList(category) {

    return () => {
      this.setState(prevState => {
        if(prevState.currentCategory !== category) return { currentCategory: category };
      });

    }
  }

  renderCategories() {
    const { categories } = this.state;

    if(categories.length > 0) return categories.map((category, index) => (<li key={index} onClick={this.toFilterList(category)} >{category}</li>));

  }

  renderPosts() {
    const { posts, categories, currentCategory, isLoading } = this.state;

    if(isLoading) return (<div className='posts-loading'/>);

    let showPosts = [];

    // To check if the category was selected
    if(currentCategory === null) {

      // If not: list all
      for(let i = 0; i < categories.length; i++) {
        showPosts = showPosts.concat(posts[categories[i]]);
      }

    }else {

      // if yes: list category selected
      showPosts = posts[currentCategory];

    }

    // Return list of posts
    return showPosts.map((item, index) => (<Post {...item} key={index} />))

  }

  render() {
    const { logger, renderCategories, renderPosts } = this;

    logger('ROOT COMPONENT', () => console.info('State: ', this.state));

    return (
      <div className='backgraund'>
        <Header title='Reading' render={renderCategories} />
        <Main render={renderPosts}/>
      </div>
    );
  }

  componentDidMount() {

    Store.dispatch(addPostsAsync());

  }

  logger(title, middleFunction) {
    console.group(title);
    middleFunction();
    console.groupEnd(title);
  }

}

/**
 * ============ Functinal Stateless Components ============
 * Local components(stateless) for UI composition
 */

const Header = ({ title, render }) => (
  <header>
    <h1>{title}</h1>
    <nav>
      <ul> { render() } </ul>
    </nav>
  </header>
);

const Main = ({ render }) => (
  <main>
  { render() }
  </main>
);

const Post = ({ title, author, commentCount, voteScore }) => (
  <div className='post'>
    <h2>{title}</h2>
    <p>{author}</p>
    <hr className='line' />
    <div className='post-options'>
      <div>
        <span>{`Comments: ${commentCount}`}</span>
      </div>
      <div>
        <span>{`Vote Score: ${voteScore}`}</span>
      </div>
      <div>
        <img src={thumbsUp} alt='like'/>
        <span>like</span>
      </div>
      <div>
        <img src={thumbsDown} alt='dislike' />
        <span>dislike</span>
      </div>
      <div>
        <span>order</span>
      </div>
    </div>
  </div>
);

/**
function mapDispatchToProps(dispatch) {
  return {
    getPostsAsync: () => dispatch(addPostsAsync()),
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { posts }
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
*/

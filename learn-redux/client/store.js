//Base imports
import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

//Import the root reducer
import rootReducer from './reducers/index';

//Import the data
import comments from './data/comments';
import posts from './data/posts';

//Create an object for our default state;
const defaultState = { posts, comments };

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;

import React from 'react';
import { render } from 'react-dom';

//Import CSS
import css from './styles/style.styl';

//Import Components
import Main from './components/Main';
import Single from './components/Single';
import PhotoGrid from './components/PhotoGrid';

//Import React Router Dependencies
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const Reduxstagram = () => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Main}>
        <IndexRoute component={PhotoGrid} />
        <Route path="/view/:postID" component={Single} />
      </Route>
      <Route path="/" component={Main} />
    </Router>
  </Provider>
);

render(<Reduxstagram />, document.getElementById('root'));

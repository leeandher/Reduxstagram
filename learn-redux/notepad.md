## Learn Redux

A quick place for notes about stuff that I pick up throughout the [Learn Redux][learnredux.com] course.

---

### `React.cloneElement()` and `props.children`

So quick refresher because I totally forgot about the existance of `props.children`. Essentially it allows you to plan where the contents of a component may go when rendered. Take a look:

```js
//Header.js

const Headline = props => (
  <div className="page-header">
    <h2 className="article-title">{props.title}</h2>
    <section className="article-info">
      {props.children}
    </section>
  </div>
);

```

```js
//Page.js

class App extends React.Component {
  //...some fake logic
  render() {
    return (
      <Headline title="A crazy story!">
        <Writer />
        <Editor />
        <Publisher />
        <Content />
      </Headline>
    )
  }
}
```

```html
<!-- Rendered HTML -->
<div class="page-header">
  <h2 class="article-title">A crazy story!</h2>
  <section class="article-info">
    <div class="article-writer">...</div>
    <div class="article-editor">...</div>
    <div class="article-publisher">...</div>
    <div class="article-content">...</div>
  </section>
</div>
```

Simple enough. You can render whatever you want, where ever you want. But with this method, we actually can't pass props down to our nested components.

In order to do that, we can use the React Top-Level API to clone an element with the props nested!

```js
//Header.js

const Headline = props => (
  <div className="page-header">
    <h2 className="article-title">{props.title}</h2>
    <section className="article-info">
      React.cloneElement(props.children, props)
    </section>
  </div>
);

```

Now we will generate the same HTML, except our `props` information is easily passed down. It essentially is the same as having the following JSX snippet:

```js
<Headline title="A crazy story!">
  <Writer title="A crazy story!" />
  <Editor title="A crazy story!" />
  <Publisher title="A crazy story!" />
  <Content title="A crazy story!" />
</Headline>
```

---

### Index Routes

React Router allows you to create nested routes by simply putting `<Route>` component within another `<Route>` component. With this, you get the following:

```js
<Route path="/" component={Main}>  //Always render the Main component
  <IndexRoute component={PhotoGrid} /> //Default to the PhotoGrid component 
  <Route path="/view/:postID" component={Single} /> //On route '/view/anything' show the Single component
</Route>
```

This can be useful when creating complicated nested logic for single page applications. Remember though, this is client-side routing, and doesn't actually ping the server when switching routes.

---

### Redux Stores

Stores are a concept in Redux which contain the global state of your application. Every state of every component covered under the store is contained in one simple place. We can instanitate a store via the following:

```js
//Create an object for our default state;
const defaultState = { posts, comments };

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
```

### Redux Actions
### Redux Reducers
### Redux Providers


//action ->
//info on what happened and what needs to change

// reducer --> does the editing of state

we dispatch an action, and the reducer will handle the action

everytime you dispatch an action, every single reducer will run
whether something should change is up to your reducer logic

connect --> inject the data at whatever level we need it. (instead of passing down from parents to children via props)

cnonect the data to our component, then make action creaters
expose our functions to buttons
expose our data to components
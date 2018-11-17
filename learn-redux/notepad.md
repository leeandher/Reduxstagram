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

```
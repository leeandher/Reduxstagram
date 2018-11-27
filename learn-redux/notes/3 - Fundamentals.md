# Learn Redux

A quick place for notes about stuff that I pick up throughout the [Learn Redux](learnredux.com) course.

_These notes are written as I go through the course, and might have information that is wrong or outdated. Simply put, I'm still learning!_

---

## Creating Actions

Now that we know what actions are, we can get more into how we make them, and designate what happens when we call them. Actions are actually very easy to make, since they are pretty much dummy functions which just return our new state object. All we have to do is create the name of the function, and pass in the info that we will be using when we modify our state. Take a look:

```js
//Add a comment
export function addComment(postId, author, comment) {
  return {
    type: 'ADD_COMMENT',
    postId,
    author,
    comment
  };
}
```

This is how we designate an action. This action is called `addComment` and in order to call it, we need to pass in a `postId`, an `author`, and the `comment` itself. In exchange, we get an object with the `type` of `ADD_COMMENT` which will be accessed by our reducer in the next step.

In terms of organization. Depending on the complexity of your application, it might be best to create an `actions/` directory in which you store your actions by scope, i.e. `storeActionCreators`, `userActionCreators`, etc. If not complex, just create one file entitled `actionCreators` and export all the functions from there.

---

## Using Reducers

Reducers are the functions which actually perform the operation on our state. Taking what we know about pure functions, we try not to mutate our state, and instead take a copy whenever we perform any actions in the reducer. The most significant part about setting up a reducer is the `switch` statement.

When you set up the reducer, it is a function which takes in two parameters, the `state` (which is set default to `[]`), and the action. The switch statement is used for `action.type` in which we match the action to an operation based on the scope of the reducer. Take a look at the following:

```js
// ./reducers/posts.js

function posts(state = [], action) {
  switch (action.type) {
    case 'INCREMENT_LIKES':
      const i = action.index;
      return [
        //everything before this post
        ...state.slice(0, i),
        //create a new object, spread the old one, change the likes
        { ...state[i], likes: state[i].likes + 1 },
        //everything after this post
        ...state.slice(i + 1)
      ];
    //Return the modified state!
    default:
      //Don't do anything!
      return state;
  }
}

export default posts;
```

This is an example of a reducer which acts only one one action. We have a `switch` statement to catch the `action.type`, then it returns a state array that is a direct copy of the original state with a slight modification.

---

## Joining Reducers

Something important to note about Redux is that you can't simply import all your reducers at once into your store. Your store requires one **root reducer**, and it's up to you to do that. Of course you could dodge this problem by making all your reducers in the same file, but this can lead to a disorganized file structure.

Thankfully, Redux includes a nifty helper function for joining your reducers:

```js
// ./reducers/index.js

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

//Some reducers
import posts from './posts';
import comments from './comments';

const rootReducer = combineReducers({
  posts,
  comments,
  routing: routerReducer
});

export default rootReducer;
```

This guy will combine all your reducers into one which can be used as the root for your Redux store. 

_Note:_ We've also added the `routing` reducer, which comes from `react-router-redux`. This is useful for directing our routing with information from the redux store, and it requires the exact reducer title to be **_routing_**, when being instantiated.

---

## Creating a Store



## Reducer Composition

One of the fundamental patterns of building Redux apps is the ability to offshell work into **subreducers**. These are kind of like helper functions which don't take in the entire state for modification, but can instead operate on just a _slice_ that is passed to it.

Think about this; your store (or your global state) is an object. That object could have arrays, which contain objects, whose keys contain arrays, booleans and more objects and even just reading that was a little bit too hard. Trying to keep every piece of state the same in our _pure function_ reducer is difficult.

This can be simplified if we break up our operations into subreducers, using these guys to make modifications to smaller pieces of data. Take this for example:

```js
function postComments(state = [], action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      //Add a comment to the nested state
      return [...state, { user: action.author, text: action.comment }];
    case 'REMOVE_COMMENT':
      const i = action.index;
      return [
        //everything before this post
        ...state.slice(0, i),
        //everything after this post
        ...state.slice(i + 1)
      ];
    default:
      return state;
  }
}

function comments(state = [], action) {
  if (typeof action.postId !== 'undefined') {
    return {
      ...state,
      //Offload the nested state to a subreducer
      [action.postId]: postComments(state[action.postId], action)
    };
  }
  return state;
}
```

With that code, we don't have to worry about ensuring all the data is returned in one step with some complicated nested logic, we get a logical, operational reducer!
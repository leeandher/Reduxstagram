# Learn Redux

A quick place for notes about stuff that I pick up throughout the [Learn Redux](learnredux.com) course.

_These notes are written as I go through the course, and might have information that is wrong or outdated. Simply put, I'm still learning!_

---

## Subreducers

```js
 if(typeof action.postId !== 'undefined') {
    return {
      ...state,
      [action.postId]: postComments(state[action.postId], action)
    }
  }
  return state;
```
## Learn Redux

A quick place for notes about stuff that I pick up throughout the [Learn Redux](learnredux.com) course.

_These notes are written as I go through the course, and might have information that is wrong or outdated. Simply put, I'm still learning!_

---

### Pure Functions

Pure functions can be described as predictable functions. These are essential for Redux, as the basis of making changes to state. Instead of modifying the existing state, we take a copy, modify it, and return the new state back. This takes place in our reducers. While they seem scary, pure functions are actually relatively easy to underestand. By _predictable_ what I mean is that, given the same input, the function always produces the same result. See the following:

```js
const testArr = [1, 2, 3, 4];

//Impure function!
function add3toSecond(arr) {
  arr[1] += 3;
  return arr;
}

add3toSecond(testArr) // [1, 5, 3, 4]
add3toSecond(testArr) // [1, 8, 3, 4]
add3toSecond(testArr) // [1, 11, 3, 4]
```

This is an example of an impure function. Given the exact same input, function returns a different value each time, because it is able to reach outside of its scope and modify another value (in this case, `testArr`). To create a pure function, we can do the following:

```js
const testArr = [1, 2, 3, 4];

//Pure function!
function add3toSecond(arr) {
  const newArr = [...arr]
  newArr[1] += 3;
  return newArr;
}

add3toSecond(testArr) // [1, 5, 3, 4]
add3toSecond(testArr) // [1, 5, 3, 4]
add3toSecond(testArr) // [1, 5, 3, 4]
```

No matter how many times the same input is used, the function always returns the same value! Pure functions are extremely useful for things like testing and better **functional programming** practices.
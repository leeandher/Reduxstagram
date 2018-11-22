/*
A reducer takes in two things:
  1. The action (info about what happened)
  2. A copy of the current state
*/

function posts(state = [], action) {
  switch (action.type) {
    case 'INCREMENT_LIKES':
      console.log('incrementing likes!');
    //return the updated state
    default:
      //Don't do anything!
      return state;
  }
}

export default posts;

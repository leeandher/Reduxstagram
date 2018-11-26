/*
A reducer takes in two things:
  1. The action (info about what happened)
  2. A copy of the current state
*/

function comments(state = [], action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      const newComment = { text: action.comment, user: action.author };
      const newState = { ...state };
      newState[action.postId].push(newComment);
      return newState;
    case 'REMOVE_COMMENT':
    default:
      return state;
  }
}

export default comments;

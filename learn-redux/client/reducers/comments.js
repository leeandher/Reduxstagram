/*
A reducer takes in two things:
  1. The action (info about what happened)
  2. A copy of the current state
*/

function comments(state = [], action) {
  switch (action.type) {
    case 'ADD_COMMENT':
      const newComment = { text: action.comment, user: action.author };
      const addCommentState = { ...state };
      addCommentState[action.postId].push(newComment);
      return addCommentState;
    case 'REMOVE_COMMENT':
      const removeCommentState = { ...state };
      removeCommentState[action.postId].splice(action.index, 1);
      return removeCommentState;
    default:
      return state;
  }
}

export default comments;

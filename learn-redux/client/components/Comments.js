import React from 'react';

class Comments extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.refs);
  }

  renderComment(comment, i) {
    return (
      <div className="comment" key={i}>
        <p>
          <strong>{comment.user}</strong>
          {comment.text}
          <button className="remove-comment">&times;</button>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div className="comments">
        <div className="comment">
          {this.props.postComments.map(this.renderComment)}
          <form
            className="comment-form"
            ref="commentForm"
            onSubmit={this.handleSubmit}
          >
            <input type="text" ref="author" placeholder="author" />
            <input type="text" ref="comment" placeholder="comment" />
            <input type="submit" hidden />
          </form>
        </div>
      </div>
    );
  }
}

export default Comments;

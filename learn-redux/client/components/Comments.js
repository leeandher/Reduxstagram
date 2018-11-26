import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { postId } = this.props.params;
    const author = this.refs.author.value;
    const comment = this.refs.comment.value;
    this.props.addComment(postId, author, comment);
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

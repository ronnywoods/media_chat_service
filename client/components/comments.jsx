import React from 'react';
import CommentHead from './commentHead.jsx';
import CommentBody from './commentBody.jsx';
import { readyComments } from '../clientHelpers.js';

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortMethod: 'date',
      userPosts: [],
      newCommentCount: 0
    };
    this.commentData = this.props.commentData;
    this.prependUserComment = this.prependUserComment.bind(this);
    this.sortByLikes = this.sortByLikes.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
  }

  prependUserComment(userPost) {
    if (userPost) {
      this.setState({
        userPosts: [userPost, ...this.state.userPosts],
        commentCount: this.state.commentCount + 1
      });
    } else {
      this.setState({ commentCount: this.state.commentCount + 1 });
    }
  }

  sortByLikes() {
    this.setState({ sortMethod: 'likes' });
  }

  sortByDate() {
    this.setState({ sortMethod: 'date' });
  }

  render() {
    let commentsToRender;
    if (this.state.sortMethod === 'date') {
      commentsToRender = readyComments(this.props.commentData, (a, b) => new Date(b.commentDate) - new Date(a.commentDate));
    } else {
      commentsToRender = readyComments(this.props.commentData, (a, b) => (b.likes - a.likes));
    }
    return (
      <div>
        <CommentHead sortByDate={this.sortByDate} sortByLikes={this.sortByLikes} video={this.props.video} userImage={this.props.userImage} prependUserComment={this.prependUserComment} commentCount={this.props.commentData.length + this.state.newCommentCount} />
        <CommentBody video={this.props.video} prependUserComment={this.prependUserComment} commentData={commentsToRender} userImage={this.props.userImage} userPosts={this.state.userPosts} userCommentFeelings={this.props.userCommentFeelings} />
      </div>
    );
  }
}

export default Comments;
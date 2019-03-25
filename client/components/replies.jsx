import styled from 'styled-components';
import Reply from './reply.jsx';
import React from 'react';

const Toggle = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 2px;
  line-height: 16px;
  cursor: pointer;
`;

class Replies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReplies: false
    };
    this.showReplies = this.showReplies.bind(this);
  }

  showReplies() {
    this.setState({ showReplies: !this.state.showReplies });
  }
  
  render() {
    let allReplies = [];
    let replyCount = this.props.replies.length;
    for (let i = 0; i < replyCount; i++) {
      let data = this.props.replies[i];
      let liked = false;
      let disliked = false;
      for (let j = 0; j < this.props.userCommentFeelings.length; j++) {
        if (this.props.userCommentFeelings[j].commentId === data.id) {
          if (this.props.userCommentFeelings[j].feeling) {
            liked = true;
          } else {
            disliked = true;
          }
        }
      }
      allReplies.push(<Reply prependUserReply={this.props.prependUserReply} liked={liked} disliked={disliked} userImage={this.props.userImage} video={data.videoId} id={data.id} image={data.image} username={data.username} commentDate={data.commentDate} likes={data.likes} dislikes={data.dislikes} text={data.text} />);
    }
    if (this.state.showReplies) {
      return (
        <div>
          <Toggle onClick={this.showReplies}>Hide replies ⋀</Toggle>
          {allReplies}
        </div>
      );
    } else {
      return (
        <div>
          <Toggle onClick={this.showReplies}>{`View ${replyCount} replies ⋁`}</Toggle>
        </div>
      );
    }
  }
  
}

export default Replies;
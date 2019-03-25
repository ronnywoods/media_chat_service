import styled from 'styled-components';
import React from 'react';
import Replies from './replies.jsx';
import CommentForm from './commentForm.jsx';
import { timeSince } from '../clientHelpers.js';
import { commentFeelingPost } from '../clientHelpers.js';
import LazyLoad from 'react-lazyload';

var Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  padding-top: 16px;
  align-items: top;
`;

var CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

var ImageContainer = styled.div`
  display: inline-block;
  height: 40px;
  width: 40px;
  margin-left: 4px;
  margin-right: 16px;
  flex-grow: 0;
  flex-shrink: 0;
`;

var Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 25%;
  object-fit: cover;
`;

var NameAndDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

var CommentText = styled.div`
  color: rgb(17, 17, 17);
  line-height: 20px;
  margin-right: 10px;
  white-space: pre-wrap;
  margin-bottom: 6px;
`;

var CommentingUser = styled.div`
  font-size: 13px;
  font-weight: 500;
  margin-right: 5px;
  line-height: 18px;
`;

var PublishDate = styled.div`
  color: rgb(96, 96, 96);
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
`;

var Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 26px;
`;

const LikeDislike = styled.img`
  display: inline-block;
  max-height: 60%;
  object-fit: cover;
  margin-right: 5px;
  cursor: pointer;
  filter: ${props => props.filter};
`;

var LikeCount = styled.div`
  display: inline-block;
  color: rgb(96, 96, 96);
  font-size: 13px;
  font-weight: 400;
  width: 50px;
`;

var Reply = styled.div`
  display: inline-block;
  margin-left: 20px;
  color: rgb(96, 96, 96);
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
`;

var RepliesContainer = styled.div`
  display: block;
  width: 100%;
`;

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      newReplies: [],
      newDislike: 0,
      newLike: 0
    };
    this.prepReply = this.prepReply.bind(this);
    this.cancelReply = this.cancelReply.bind(this);
    this.prependUserReply = this.prependUserReply.bind(this);
    this.likeToggle = this.likeToggle.bind(this);
    this.dislikeToggle = this.dislikeToggle.bind(this);
  }

  prepReply() {
    this.setState({ collapse: false });
  }

  cancelReply() {
    this.setState({ collapse: true });
  }

  prependUserReply(userPost) {
    this.setState({
      newReplies: [userPost, ...this.state.newReplies]
    });
    this.props.prependUserComment();
  }

  likeToggle() {
    let increment;
    if (this.props.liked) {
      increment = this.state.newLike === 0 ? -1 : 0;
    } else {
      increment = this.state.newLike === 0 ? 1 : 0;
    }
    let feelingAsBool = increment === 0 ? this.props.liked : !this.props.liked;
    commentFeelingPost('testUser', this.props.id, 'like', feelingAsBool, (data, status) => {
      console.log(data);
    }, (err, errDesc) => {
      console.log('there was an issue');
    });
    this.setState({
      newLike: increment,
    });
  }

  dislikeToggle() {
    let increment;
    if (this.props.disliked) {
      increment = this.state.newDislike === 0 ? -1 : 0;
    } else {
      increment = this.state.newDislike === 0 ? 1 : 0;
    }
    let feelingAsBool = increment === 0 ? this.props.disliked : !this.props.disliked;
    commentFeelingPost('testUser', this.props.id, 'dislike', feelingAsBool, (data, status) => {
      console.log(data);
    }, (err, errDesc) => {
      console.log('there was an issue');
    });
    this.setState({ newDislike: increment });
  }
  
  render() {
    let likeFilter;
    let dislikeFilter;
    let liked = this.state.newLike === 0 ? this.props.liked : !this.props.liked;
    if (liked) {
      likeFilter = 'invert(23%) sepia(64%) saturate(4654%) hue-rotate(207deg) brightness(91%) contrast(95%)';
    } else {
      likeFilter = 'invert(57%) sepia(6%) saturate(7%) hue-rotate(316deg) brightness(99%) contrast(89%)';
    }
    let disliked = this.state.newDislike === 0 ? this.props.disliked : !this.props.disliked;
    if (disliked) {
      dislikeFilter = 'invert(23%) sepia(64%) saturate(4654%) hue-rotate(207deg) brightness(91%) contrast(95%)';
    } else {
      dislikeFilter = 'invert(57%) sepia(6%) saturate(7%) hue-rotate(316deg) brightness(99%) contrast(89%)';
    }

    let allReplies = this.state.newReplies.length === 0 ? this.props.replies : [...this.props.replies, ...this.state.newReplies];
    
    return (
      <Container>
        <ImageContainer>
          <LazyLoad>
            <Image src={this.props.image}></Image>
          </LazyLoad>
        </ImageContainer>
        <CommentContainer>
          <NameAndDate>
            <CommentingUser>{this.props.username}</CommentingUser>
            <PublishDate>{timeSince(this.props.commentDate)}</PublishDate>
          </NameAndDate>
          <CommentText>{this.props.text}</CommentText>
          <Actions>
            <LikeDislike onClick={this.likeToggle} filter={likeFilter} src="https://d1ggtrrftyy4ru.cloudfront.net/up.svg"></LikeDislike>
            <LikeCount>{this.props.likes + this.state.newLike}</LikeCount>
            <LikeDislike onClick={this.dislikeToggle} filter={dislikeFilter} src="https://d1ggtrrftyy4ru.cloudfront.net/down.svg"></LikeDislike>
            <Reply onClick={this.prepReply}>REPLY</Reply>
          </Actions>
          <RepliesContainer>
            {!this.state.collapse &&
              <CommentForm focus='true' imageSize='24px' id={this.props.id} video={this.props.video} prependUserComment={this.prependUserReply} cancel={this.cancelReply} userImage={this.props.userImage} />
            }
            {this.props.replies.length > 0 &&
              <Replies userCommentFeelings={this.props.userCommentFeelings} prependUserReply={this.prependUserReply} id={this.props.id} replies={allReplies} userImage={this.props.userImage} />
            }
          </RepliesContainer>
        </CommentContainer>
      </Container>
    );
  }
}

export default Comment;
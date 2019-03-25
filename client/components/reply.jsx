import styled from 'styled-components';
import React from 'react';
import CommentForm from './commentForm.jsx';
import { timeSince } from '../clientHelpers.js';
import { commentFeelingPost } from '../clientHelpers.js';

var Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 8px;
  padding-top: 16px;
  align-items: top;
`;

var ReplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

var ImageContainer = styled.div`
  display: inline-block;
  height: 24px;
  width: 24px;
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

var ReplyText = styled.div`
  color: rgb(17, 17, 17);
  line-height: 20px;
  margin-right: 10px;
  white-space: pre-wrap;
  margin-bottom: 6px;
`;

var ReplyingUser = styled.div`
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
  margin-bottom: 10px;
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

var ReplyButton = styled.div`
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

class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      newLike: 0,
      newDislike: 0
    };
    this.prepReply = this.prepReply.bind(this);
    this.cancelReply = this.cancelReply.bind(this);
    this.likeToggle = this.likeToggle.bind(this);
    this.dislikeToggle = this.dislikeToggle.bind(this);
  }

  prepReply() {
    this.setState({ collapse: false });
  }

  cancelReply() {
    this.setState({ collapse: true });
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

    return (
      <Container>
        <ImageContainer>
          <Image src={this.props.image}></Image>
        </ImageContainer>
        <ReplyContainer>
          <NameAndDate>
            <ReplyingUser>{this.props.username}</ReplyingUser>
            <PublishDate>{timeSince(this.props.commentDate)}</PublishDate>
          </NameAndDate>
          <ReplyText>{this.props.text}</ReplyText>
          <Actions>
            <LikeDislike onClick={this.likeToggle} filter={likeFilter} src="/images/up.svg"></LikeDislike>
            <LikeCount>{this.props.likes + this.state.newLike}</LikeCount>
            <LikeDislike onClick={this.dislikeToggle} filter={dislikeFilter} src="/images/down.svg"></LikeDislike>
            <ReplyButton onClick={this.prepReply}>REPLY</ReplyButton>
          </Actions>
          <RepliesContainer>
            {!this.state.collapse &&
              <CommentForm default={`@${this.props.username}: `} focus='true' imageSize='24px' id={this.props.id} video={this.props.video} prependUserComment={this.props.prependUserReply} cancel={this.cancelReply} userImage={this.props.userImage} />
            }
          </RepliesContainer>
        </ReplyContainer>
      </Container>
    );
  }
}

export default Reply;
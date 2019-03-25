import styled from 'styled-components';
import React from 'react';
import { commentPost } from '../clientHelpers';

var AddCommentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  padding-top: 8px;
  align-items: flex-start;
`;

var ImageContainer = styled.div`
  display: inline-block;
  height: ${props => (props.imageSize ? props.imageSize : '40px')};
  width: ${props => (props.imageSize ? props.imageSize : '40px')};
  margin-left: 4px;
  margin-right: 16px;
  flex-grow: 0;
  flex-shrink: 0;
`;

var UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 25%;
  object-fit: cover;
`;

var NewComment = styled.form`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 828px;
`;

var Underline = styled.div`
  background-color: rgba(17, 17, 17, 0.6);
  height: 2px;
  display: inline-block;
  transform: scale(0, 1);
  transition: all 0.3s linear;
  width: 100%;
  position: absolute;
  top: 24px;
  left: 0;
  z-index: 1;
`;

var LightUnderline = styled.div`
  background-color: rgb(144, 144, 144);
  height: 1px;
  display: inline-block;
  width: 100%;
  position: absolute;
  top: 24px;
  left: 0;
`;

var CommentInput = styled.input`
  display: block;
  position: relative;
  margin-bottom: 0;
  min-width: 100%;
  outline: none;
  border: none;
  line-height: 21px;
  color: rgba(17, 17, 17, 0.6);
  cursor: text;
  font-family: Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 400;
  &:focus {
    color: rgb(10, 10, 10);
  }
  &:focus ~ ${Underline} {
    transform: scale(1);
  }
`;

var Submissions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 10px;
  width: 100%;
  margin-bottom: -20px;
`;

var CancelSubmit = styled.input`
  font-size: 14px;
  font-weight: 500px;  
  border: none;
  width: 100px;
  height: 36px;
  margin: 0 0 0 0;
  color: rgb(96, 96, 96);
  letter-spacing: .007px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

var CommentSubmit = styled.input`
  font-size: 14px;
  font-weight: 500px;
  border: none;
  width: 100px;
  height: 36px;
  margin: 0 0 0 0;
  background-color: rgb(6, 95, 212);
  color: rgb(255, 255, 255);
  letter-spacing: .007px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: this.props.focus ? true : false,
      value: ''
    };
    this.parentId = this.props.id || 0;
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleSubmit(event) {
    const now = new Date();
    const nowAsString = now.toUTCString();
    const text = this.state.value;
    commentPost('testUser', this.props.video, this.parentId, this.state.value, (data, status) => {
      let userComment = {
        id: data[0],
        username: 'testUser',
        text: text,
        commentDate: nowAsString,
        likes: 0,
        dislikes: 0,
        image: this.props.userImage,
        replies: []
      };
      this.props.prependUserComment(userComment);
    }, (err, errDesc) => {
      console.log(err, errDesc);
    });
    this.setState({ value: '' });
    event.preventDefault();
  }

  handleCancel() {
    this.setState({
      focus: false,
      value: ''
    });
    if (this.props.cancel) {
      this.props.cancel();
    }
  }

  onFocus() {
    if (this.props.default) {
      this.setState({
        focus: true,
        value: this.props.default
      });
    } else {
      this.setState({
        focus: true
      });
    }
  }

  onBlur() {
    this.setState({
      focus: false
    });
  }

  render() {
    return (
      <AddCommentContainer>
        <ImageContainer imageSize={this.props.imageSize}>
          <UserImage src={this.props.userImage}></UserImage>
        </ImageContainer>
        <NewComment onSubmit={this.handleSubmit} onFocus={this.onFocus} >
          <CommentInput autoFocus={this.state.focus} type="text" value={this.state.value} onChange={this.handleChange} placeholder="Add a public comment..."></CommentInput>
          <Underline></Underline>
          <LightUnderline></LightUnderline>
          {this.state.focus &&
            <Submissions>
              <CancelSubmit onClick={this.handleCancel} readOnly value="CANCEL"></CancelSubmit>
              <CommentSubmit type="submit" readOnly value="COMMENT" />
            </Submissions>
          }
        </NewComment>
      </AddCommentContainer>
    );
  }
}

export default CommentForm;
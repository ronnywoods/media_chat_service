import Channel from './channel.jsx';
import Suggestions from './suggestions.jsx';
import Description from './description.jsx';
import Comments from './comments.jsx';
import styled from 'styled-components';
import React from 'react';
import { getVideoData } from '../clientHelpers.js';

var TopContainer = styled.div`
    box-sizing: border-box;
    font-family: Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    max-width: 924px;
    padding-left: 20px;
    margin-top: 12px;
    padding-right: 16px;
  `;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: this.props.subscribed,
      suggestions: null,
      collapseView: true
    };
    this.handleSubscribe = this.handleSubscribe.bind(this);
    this.handleSuggestionClose = this.handleSuggestionClose.bind(this);
    this.handleShowClick = this.handleShowClick.bind(this);
  }

  handleShowClick() {
    this.setState({
      collapseView: !this.state.collapseView
    });
  }

  handleSuggestionClose() {
    this.setState({
      suggestions: null
    });
  }

  handleSubscribe(action) {
    if (action === 'unsubscribe') {
      this.setState({
        suggestions: null,
        subscribed: false
      });
    } else {
      getVideoData(this.props.videoData.videoDetails.channel, '/watch/suggestions', (data) => {
        this.setState({
          suggestions: data,
          subscribed: true
        });
      }, (err, errDesc) => {
        console.log('err: ', err, 'errDesc: ', errDesc);
      });
    }
  }
  
  render() {
    var content = this.props.videoData.videoDetails;
    if (this.state.suggestions) {
      return (
        <TopContainer>
          <Suggestions handleSubscribe={this.handleSubscribe} handleSuggestionClose={this.handleSuggestionClose} suggestions={this.state.suggestions} />
          <Channel video={content.id} image={content.image} channel={content.channel} publishDate={content.publishDate} userSubscribes={this.state.subscribed} handleSubscribe={this.handleSubscribe} />
          <Description desc={content.description} collapseView={this.state.collapseView} handleShowClick={this.handleShowClick} />
          <Comments video={content.id} userImage={this.props.videoData.userImage.image} commentData={this.props.videoData.commentDetails} userCommentFeelings={this.props.videoData.userCommentFeelings} />
        </TopContainer>
      );
    } else {
      return (
        <TopContainer>
          <Channel video={content.id} image={content.image} channel={content.channel} publishDate={content.publishDate} userSubscribes={this.state.subscribed} handleSubscribe={this.handleSubscribe} />
          <Description desc={content.description} collapseView={this.state.collapseView} handleShowClick={this.handleShowClick} />
          <Comments video={content.id} userImage={this.props.videoData.userImage.image} commentData={this.props.videoData.commentDetails} userCommentFeelings={this.props.videoData.userCommentFeelings} />
        </TopContainer>
      );
    }
  }
}

export default Main;
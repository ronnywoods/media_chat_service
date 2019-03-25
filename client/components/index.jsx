import Main from './main.jsx';
import React from 'react';

class VideoDetailsAndComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      videoData: null,
      subscribed: null
    });
  }

  render() {
    if (!this.props.videoData) {
      return (
        <div></div>
      );
    } else {
      return (
        <Main videoData={this.props.videoData} subscribed={this.props.subscribed} />
      );
    }
  }
  
}

export default VideoDetailsAndComments;

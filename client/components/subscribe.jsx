import styled from 'styled-components';
import React from 'react';
import { subscribeChange } from '../clientHelpers.js';

var SubButton = styled.button`
  font-size: 14px;
  font-weight: 500px;  
  border: none;
  width: ${props => (props.buttonWidth ? props.buttonWidth : '105.5px')};
  height: ${props => (props.buttonHeight ? props.buttonHeight : '36px')};
  margin: ${props => (props.buttonMargin ? props.buttonMargin : '0 0 0 0')};
  background-color: #218380;
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

var UnSubButton = styled.button`
  font-size: 14px;
  font-weight: 500px;
  border: none;
  width: ${props => (props.buttonWidth ? props.buttonWidth : '105.5px')};
  height: ${props => (props.buttonHeight ? props.buttonHeight : '36px')};
  margin: ${props => (props.buttonMargin ? props.buttonMargin : '0 0 0 0')};
  background-color: rgb(238, 238, 238);
  color: rgba(17, 17, 17, 0.6);
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

class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribed: props.userSubscribes
    };
  }

  handleSubscribeClick() {
    if (this.props.handleSubscribe === 'local') {
      this.setState({
        subscribed: !this.state.subscribed
      });
    } else {
      this.props.handleSubscribe('subscribe');
    }
    subscribeChange('testUser', this.props.channel, 'subscribe', (data, status) => {}, () => console.log('there was a problem'));
  }

  handleUnsubscribeClick() {
    if (this.props.handleSubscribe === 'local') {
      this.setState({
        subscribed: !this.state.subscribed
      });
    } else {
      this.props.handleSubscribe('unsubscribe');
    }
    subscribeChange('testUser', this.props.channel, 'unsubscribe', (data, status) => {}, () => console.log('there was a problem'));
  }

  render() {
    if (this.state.subscribed) {
      return (
        <UnSubButton buttonWidth={this.props.buttonWidth} buttonHeight={this.props.buttonHeight} buttonMargin={this.props.buttonMargin} type="button" onClick={this.handleUnsubscribeClick.bind(this)}>SUBSCRIBED</UnSubButton>
      );
    } else {
      return (
        <SubButton buttonWidth={this.props.buttonWidth} buttonHeight={this.props.buttonHeight} buttonMargin={this.props.buttonMargin} type="button" onClick={this.handleSubscribeClick.bind(this)}>SUBSCRIBE</SubButton>
      );
    }
  }

}

export { SubButton };
export { UnSubButton };
export default Subscribe;
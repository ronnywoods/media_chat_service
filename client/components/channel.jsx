import Subscribe from './subscribe.jsx';
import styled from 'styled-components';
import React from 'react';

const Channel = (props) => {
  var date = new Date(props.publishDate);
  var dateOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  };
  var published = new Intl.DateTimeFormat('en-US', dateOptions).format(date);

  var Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    border-top: 0.5px solid rgba(17, 17, 17, 0.6);
    display: flex;
    flex-direction: row;
    margin-bottom: 12px;
    padding-top: 16px;
    align-items: center;
  `;

  var ChannelDetails = styled.div`
    display: flex;
    flex-direction: row;
    flex-basis: .0001px;
    flex-grow: 1;
    flex-shrink: 1;
  `;

  var ImageContainer = styled.div`
    display: inline-block;
    height: 48px;
    width: 48px;
    margin-right: 16px;
  `;

  var Image = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 25%;
    object-fit: cover;
  `;

  var NameAndDate = styled.div`
    flex-direction: column;
    justify-content: center;
    flex-basis: .0001px;
    flex-grow: 1;
    flex-shrink: 1;
  `;

  var UserChannel = styled.div`
    color: rgb(10, 10, 10);
    font-weight: 500;
    line-height: 18px;
    white-space: nowrap;
    margin-right: 10px;
  `;

  var PublishDate = styled.div`
    color: rgba(17, 17, 17, 0.6);
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
  `;

  return (
    <Container>
      <ChannelDetails>
        <ImageContainer>
          <Image src={props.image} alt="Profile Pic"></Image>
        </ImageContainer>
        <NameAndDate>
          <UserChannel>{props.channel}
            <PublishDate>{`Published on ${published}`}</PublishDate>
          </UserChannel>
        </NameAndDate>
        <Subscribe buttonMargin={'0 10px 0 0'} channel={props.channel} userSubscribes={props.userSubscribes} handleSubscribe={props.handleSubscribe} />
      </ChannelDetails>
    </Container>
  );
};

export default Channel;
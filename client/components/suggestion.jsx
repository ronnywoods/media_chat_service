import Subscribe from './subscribe.jsx';
import styled from 'styled-components';
import React from 'react';

var Suggestion = (props) => {

  var SuggestionContainer = styled.div`
    box-sizing: border box;
    display: flex;
    flex-direction: column;
    min-width: 210px;
    height: 124px;
    justify-content: center;
    align-items: center;
    margin: 3px;
    color: rgb(10, 10, 10);
    font-weight: 500;
    white-space: nowrap;
  `;

  var Image = styled.div`
    background-image: url(${props => (props.url)});
    display: block;
    width: 100%;
    height: 56px;
    background-size: cover;
    background-position: center center;
    margin-bottom: 10px;
  `;

  var Channel = styled.div`
    margin-bottom: 10px;
  `;

  var ButtonContainerA = styled.div`
  width: 105.5px;
  max-height: 20px;
  font-weight: 500px;
`;

  return (
    <SuggestionContainer>
      <Image url={props.image}></Image>
      <Channel>{props.channel}</Channel>
      <ButtonContainerA>
        <Subscribe buttonHeight={'24px'} channel={props.channel} userSubscribes={false} handleSubscribe={'local'} />
      </ButtonContainerA>
    </SuggestionContainer>
  );
};

export default Suggestion;
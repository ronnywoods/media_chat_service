import styled from 'styled-components';
import Suggestion from './suggestion.jsx';
import ScrollButtons from './scrollButtons.jsx';
import React from 'react';

var Container = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;

var CloseButton = styled.a`
  position: absolute;
  -webkit-appearance: none;
  border: none;
  top: -5px;
  right: 0px;
  text-align: center;
  vertical-align: middle;
  font-family: sans-serif;
  font-size: 28px;
  font-weight: 100;
  color: rgb(144, 144, 144);
  line-height: 40px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
`;

var SuggestionContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

var Heading = styled.h1`
  font-size: 16px;
  display: block;
  line-height: 20px;
  margin-bottom: 16px;
  margin-top: 16px;
  margin-left: 20px;
`;

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.suggestions = React.createRef();
    this.scroll = this.scroll.bind(this);
    this.state = {
      placeholder: null,
      canScrollRight: true,
      canScrollLeft: false
    };
  }

  scroll(direction) {
    var distance = 631;
    var frequency = 5;
    var pixelsEachInterval = direction === 'right' ? 15 : -15;
    var pixelsMoved = 0;
    var animateScroll;
    var check = () => {
      if (pixelsMoved >= distance) {
        clearInterval(animateScroll);
        this.checkScrollStatus();
        return;
      } else {
        this.suggestions.current.scrollLeft += pixelsEachInterval;
        pixelsMoved += Math.abs(pixelsEachInterval);
      }
    };
    animateScroll = setInterval(check, frequency);
  }

  checkScrollStatus() {
    if (this.suggestions.current.scrollLeft === 0) {
      this.setState({ canScrollLeft: false });
    } else {
      this.setState({ canScrollLeft: true });
    }
    if (this.suggestions.current.scrollWidth - this.suggestions.current.offsetWidth - this.suggestions.current.scrollLeft < 1) {
      this.setState({ canScrollRight: false });
    } else {
      this.setState({ canScrollRight: true });
    }
  }

  componentDidMount() {
    this.checkScrollStatus();
  }
  
  render() {
    var suggestions = [];
    for (var i = 0; i < this.props.suggestions.length; i++) {
      var details = this.props.suggestions[i];
      suggestions.push(<Suggestion channel={details.selectedChannel} image={details.selectedChannelImage} />);
    }
    return (
      <Container>
        <Heading>Recommended for you</Heading>
        <CloseButton onClick={() => this.props.handleSuggestionClose()}>×</CloseButton>
        <SuggestionContainer ref={this.suggestions} >
          {suggestions}
        </SuggestionContainer>
        <ScrollButtons scroll={this.scroll} canScrollLeft={this.state.canScrollLeft} canScrollRight={this.state.canScrollRight} />
      </Container>
    );
  }
}

export default Suggestions;
import styled from 'styled-components';
import React from 'react';
import CommentForm from './commentForm.jsx';
import SortSelect from './sortSelect.jsx';

const Container = styled.div`
  height: 40px;
  margin-top: 16px;
  margin-bottom: 16px;
  border-top: 0.5px solid rgba(17, 17, 17, 0.6);
  padding-top: 16px;
  font-size: 16px;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  `;

const CommentCount = styled.div`
  display: inline-block;
  margin-right: 40px;
`;

const SortContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const SortIcon = styled.img`
  display: inline-block;
  max-height: 100%;
  object-fit: cover;
  margin-right: 5px;
`;

const SortText = styled.div`
  display: inline-block;
  font-size: 14px;
  color: rgb(96, 96, 96);
`;

class CommentHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSort: false
    };
    this.onSortFocus = this.onSortFocus.bind(this);
    this.onSortBlur = this.onSortBlur.bind(this);
  }

  onSortFocus() {
    this.setState({ showSort: true });
  }

  onSortBlur() {
    setTimeout(() => {
      this.setState({ showSort: false });
    }, 0);
  }

  render() {
    return (
      <div>
        <Container>
          <CommentCount>{`${this.props.commentCount} Comments`}</CommentCount>
          <SortContainer onClick={this.onSortFocus} >
            <SortIcon src="/images/sort_grey_48x48.png"></SortIcon>
            <SortText>SORT BY</SortText>
            {this.state.showSort &&
              <SortSelect sortByDate={this.props.sortByDate} sortByLikes={this.props.sortByLikes} onSortBlur={this.onSortBlur}/>
            }
          </SortContainer>
        </Container>
        <CommentForm video={this.props.video} prependUserComment={this.props.prependUserComment} userImage={this.props.userImage} />
      </div>
    );
  }
}

export default CommentHead;
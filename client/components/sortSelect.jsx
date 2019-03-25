import styled from 'styled-components';
import React from 'react';


const SortSelect = (props) => {
  const SortSelection = styled.div`
    display: flex;
    z-index: 1;
    flex-direction: column;
    position: absolute;
    top: 35px;
    font-family: Roboto, Arial, sans-serif;
    font-size: 14px;
    font-weight: 400;
    background: rgb(255, 255, 255);
    border-radius: 10%;
    width: 100px;
    height: 40px;
    &:focus {
      outline: 0;
    }
  `;
  
  const Option = styled.input`
    font-family: Roboto, Arial, sans-serif;
    box-shadow: 3px 3px grey;
    border-top: 5px solid rgb(6, 95, 212);
    cursor: pointer;
    font-size: 14px;
    font-weight: 400;
    background: rgb(255, 255, 255);
    border-radius: 5%;
    width: 120px;
    min-height: 40px;
    text-align: center;
    &:focus {
      outline: 0;
    }
    &:hover {
      background: rgb(238, 238, 238);
    }
  `;
  
  const onTopCommentsSelect = () => {
    props.sortByLikes();
    props.onSortBlur();
  };

  return (
    <SortSelection>
      <Option readOnly autoFocus={true} onBlur={props.onSortBlur} onClick={onTopCommentsSelect} value="Top Comments"></Option>
      <Option readOnly onMouseDown={props.sortByDate} value="Newest First"></Option>
    </SortSelection>
  );

};

export default SortSelect;
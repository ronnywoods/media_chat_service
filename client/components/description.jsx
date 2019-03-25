import styled from 'styled-components';
import React from 'react';

var Container = styled.div`
  box-sizing: border-box;
  white-space: pre-wrap;
  max-width: 742px;
  line-height: 21px;
  padding: 0 10px 0 68px;
`;

var DescBlock = styled.div`
  max-height: ${props => (props.collapse ? '65px' : 'auto')};
  overflow-y: hidden;
  color: rgb(10, 10, 10);
  margin-bottom: 10px;
`;

var ShowView = styled.span`
  color: rgba(17, 17, 17, 0.6);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

const Description = (props) => {
  return (
    <Container>
      <DescBlock collapse={props.collapseView}>{props.desc}</DescBlock>
      <ShowView onClick={() => props.handleShowClick()}>{props.collapseView ? 'SHOW MORE' : 'SHOW LESS'}</ShowView>
    </Container>
  );
};

export { ShowView };
export default Description;
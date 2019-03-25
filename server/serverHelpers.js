import React from 'react';
import ReactDOMServer from 'react-dom/server';
import VideoDetailsAndComments from '../client/components/index.jsx';
import Layout from './layout';
import { ServerStyleSheet } from 'styled-components';


const renderToHTML = (props) => {
  const sheet = new ServerStyleSheet();
  const component = React.createElement(VideoDetailsAndComments, props);
  const body = ReactDOMServer.renderToString(sheet.collectStyles(component));
  const styles = sheet.getStyleTags();
  return Layout(styles, body, props);
};

export { renderToHTML };
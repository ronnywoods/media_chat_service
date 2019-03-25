const Layout = (styles, body, props) => {
  console.log(props);
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>YouTune - Video Details</title>
      ${styles}
      <link rel="shortcut icon" href="/images/youtune.png">
      <link rel="stylesheet" type="text/css" href="/reset.css">
      <link href="https://fonts.googleapis.com/css?family=Roboto:400,500" rel="stylesheet">
    </head>
    <body>
      <div id="root">${body}</div>
      <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
      <script src="/bundle.js"></script>
      <script>
        ReactDOM.hydrate(
          React.createElement(VideoDetailsAndComments, ${JSON.stringify(props)}),
          document.getElementById('root')
        );
      </script>
    </body>
  </html>
  `;
};

export default Layout;
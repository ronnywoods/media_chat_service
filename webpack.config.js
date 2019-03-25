var path = require('path');
const nodeExternals = require('webpack-node-externals');
var CLIENT_SRC_DIR = path.join(__dirname, '/client');
var CLIENT_DIST_DIR = path.join(__dirname, '/public');
const SERVER_DIR = path.join(__dirname, '/server');

const client = {
  entry: `${CLIENT_SRC_DIR}/videoDetailsWindow.js`,
  output: {
    filename: 'bundle.js',
    path: CLIENT_DIST_DIR
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: CLIENT_SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: ['babel-plugin-styled-components']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

const server = {
  entry: `${SERVER_DIR}/index.js`,
  output: {
    filename: 'serverBundle.js',
    path: SERVER_DIR
  },
  target: 'node',
  mode: 'production',
  node: {
    __dirname: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: ['babel-plugin-styled-components']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};

module.exports = [ client, server ];
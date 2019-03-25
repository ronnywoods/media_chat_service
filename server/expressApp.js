var express = require('express');
var app = express();
var db = require('../database/index.js');
var path = require('path');
import { renderToHTML } from './serverHelpers';
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//add for url of each group member's proxy server?
app.use(function(req, res, next) {
  var allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000', 'http://node-express-proxy-env.kqhqma2x38.us-west-2.elasticbeanstalk.com', 'http://video-list-proxy-server-dev.us-west-1.elasticbeanstalk.com', 'http://127.0.0.1:8081', 'http://localhost:8081'];
  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  return next();
});

app.get('/', (req, res) => {
  var response = {};
  return db('videos').select().leftJoin('users', 'videos.channel', 'users.username').where('videos.id', 1)
    .then((result) => {
      response.videoDetails = result[0];
    }).then(() => {
      return db('comments').select().leftJoin('users', 'comments.username', 'users.username').where('comments.videoId', 1);
    }).then((result) => {
      response.commentDetails = result;
    }).then(() => {
      return db('commentfeelings').select().where('commentfeelings.username', 'testUser');
    }).then((result) => {
      response.userCommentFeelings = result;
    }).then(() => {
      return db('subscribes').select().where('subscribes.username', 'testUser');
    }).then((result) => {
      response.userSubscribes = result;
    }).then(() => {
      return db('users').select().where('users.username', 'testUser');
    }).then((result) => {
      response.userImage = result[0];
    }).then(() => res.status(200).send(renderToHTML({ videoData: response, subscribed: false })));
});

// removing for deployed version
// app.use('/watch', express.static(path.join(__dirname, '../public')));
// app.use('/', express.static(path.join(__dirname, '../public')));

app.get('/watch/details', (req, res) => {
  var response = {};
  return db('videos').select().leftJoin('users', 'videos.channel', 'users.username').where('videos.id', req.query.id)
    .then((result) => {
      response.videoDetails = result[0];
    }).then(() => {
      return db('comments').select().leftJoin('users', 'comments.username', 'users.username').where('comments.videoId', req.query.id);
    }).then((result) => {
      response.commentDetails = result;
    }).then(() => {
      return db('commentfeelings').select().where('commentfeelings.username', req.query.currUser);
    }).then((result) => {
      response.userCommentFeelings = result;
    }).then(() => {
      return db('subscribes').select().where('subscribes.username', req.query.currUser);
    }).then((result) => {
      response.userSubscribes = result;
    }).then(() => {
      return db('users').select().where('users.username', req.query.currUser);
    }).then((result) => {
      response.userImage = result[0];
    }).then(() => res.status(200).send(response));
});

app.get('/watch/suggestions', (req, res) => {
  return db.raw('SELECT * FROM users LEFT JOIN (SELECT channel FROM subscribes WHERE username = \'testUser\') as subscriptions ON users.username = subscriptions.channel')
    .then((result) => {
      var channels = result.rows;
      let availableSuggestions = [];
      let randomSelections = [];
      for (let i = 0; i < channels.length; i++) {
        let selectedChannel = channels[i].username;
        let selectedChannelImage = channels[i].image;
        let subscribedToChannel = channels[i].channel ? true : false;
        let ruleOut = subscribedToChannel ? true :
          selectedChannel === req.query.id ? true : 
            selectedChannel === req.query.currUser ? true : false;
        if (!ruleOut) {
          availableSuggestions.push({selectedChannel, selectedChannelImage});
        }
      }
      if (availableSuggestions.length <= 10) {
        randomSelections = availableSuggestions;
      } else {
        while (randomSelections.length < 10) {
          let randomNumbers = [];
          let randomNumber = Math.floor(Math.random() * availableSuggestions.length);
          if (randomNumbers.indexOf(randomNumber) === -1) {
            randomNumbers.push(randomNumber);
            randomSelections.push(availableSuggestions[randomNumber]);
          }
        }
      }
      res.status(200).send(randomSelections);
    });
});

app.post('/watch/subscribe', urlencodedParser, (req, res) => {
  if (req.body.action === 'unsubscribe') {
    return db('subscribes').where({
      username: req.body.user,
      channel: req.body.channel
    }).del().then(() => {
      return db('users').where('username', '=', req.body.channel).decrement('subscribers', 1);
    }).then((data) => {
      res.sendStatus(201);
    });
  } else {
    return db('subscribes').insert({
      username: req.body.user,
      channel: req.body.channel
    }).then(() => {
      return db('users').where('username', '=', req.body.channel).increment('subscribers', 1);
    }).then((data) => {
      res.sendStatus(201);
    });
  }
});

app.post('/watch/comment', urlencodedParser, (req, res) => {
  let now = new Date();
  let nowAsString = now.toUTCString();
  return db('comments').insert({
    commentDate: nowAsString,
    videoId: req.body.videoId,
    parentId: req.body.parentId,
    username: req.body.username,
    text: req.body.text,
    likes: 0,
    dislikes: 0
  }).returning('id').then((id) => {
    res.status(201).send(id);
  });
});

app.post('/watch/commentFeeling', urlencodedParser, (req, res) => {
  console.log(req.body.action, req.body.feeling);
  //order of conditionals: new like, like reversal, new dislike, dislike reversal
  if (req.body.action === 'like' && req.body.feeling === 'true') {
    return db('commentfeelings').insert({
      username: req.body.username,
      commentId: req.body.commentId,
      feeling: true
    }).then(() => {
      return db('comments').where('id', '=', req.body.commentId).increment('likes', 1);
    }).then(() => { res.status(201).send([req.body.username, req.body.commentId, 'like added']); });
  } else if (req.body.action === 'like' && req.body.feeling === 'false') {
    return db('commentfeelings').where({
      username: req.body.username,
      commentId: req.body.commentId,
      feeling: true
    }).del().then(() => {
      return db('comments').where('id', '=', req.body.commentId).decrement('likes', 1);
    }).then(() => { res.status(201).send([req.body.username, req.body.commentId, 'like removed']); });
  } else if (req.body.action === 'dislike' && req.body.feeling === 'true') {
    //note here the feeling in the ajax request is true, as in 'it's true that user has disliked'; stored in database as false (since database was set up as storing binary like/dislike feeling)
    return db('commentfeelings').insert({
      username: req.body.username,
      commentId: req.body.commentId,
      feeling: false
    }).then(() => {
      return db('comments').where('id', '=', req.body.commentId).increment('dislikes', 1);
    }).then(() => { res.status(201).send([req.body.username, req.body.commentId, 'dislike added']); });
  } else {
    return db('commentfeelings').where({
      username: req.body.username,
      commentId: req.body.commentId,
      feeling: false
    }).del().then(() => {
      return db('comments').where('id', '=', req.body.commentId).decrement('dislikes', 1);
    }).then(() => { res.status(201).send([req.body.username, req.body.commentId, 'dislike removed']); });
  }
});

export default app;
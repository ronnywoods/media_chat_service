var $ = require('jquery');

//treating all get requests as associated with 'testUser'
var getVideoData = (data, urlString, successCallback, errorCallback) => {
  $.ajax({
    url: urlString,
    method: 'GET',
    data: {
      id: data,
      currUser: 'testUser'
    },
    success: (data, status) => successCallback(data, status),
    error: (err, errDesc) => errorCallback(err, errDesc)
  });
};

var subscribeChange = (user, channel, action, successCallback, errorCallback) => {
  $.ajax({
    url: '/watch/subscribe',
    method: 'POST',
    data: {
      user: user,
      channel: channel,
      action: action
    },
    success: (data, status) => successCallback(data, status),
    error: (err, errDesc) => errorCallback(err, errDesc)
  });
};

const commentPost = (username, videoId, parentId, text, successCallback, errorCallback) => {
  console.log('post request issued');
  $.ajax({
    url: '/watch/comment',
    method: 'POST',
    data: {
      username: username,
      videoId: videoId,
      parentId: parentId,
      text: text
    },
    success: (data, status) => successCallback(data, status),
    error: (err, errDesc) => errorCallback(err, errDesc)
  });
};

const commentFeelingPost = (username, commentId, action, feelingAsBool, successCallback, errorCallback) => {
  console.log('post request issued');
  $.ajax({
    url: '/watch/commentFeeling',
    method: 'POST',
    data: {
      username: username,
      commentId: commentId,
      action: action,
      feeling: feelingAsBool
    },
    success: (data, status) => successCallback(data, status),
    error: (err, errDesc) => errorCallback(err, errDesc)
  });
};

var isUserSubscribed = (channel, arrayOfObjects) => {
  for (var i = 0; i < arrayOfObjects.length; i++) {
    if (arrayOfObjects[i].channel === channel) {
      return true;
    }
  }
  return false;
};

const timeSince = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  var secondsBetween = Math.floor((now - date) / 1000);
  let span = Math.floor(secondsBetween / 31536000);
  if (span === 1) {
    return '1 year ago';
  } else if (span > 1) {
    return `${span} years ago`;
  }
  span = Math.floor(secondsBetween / 2592000);
  if (span === 1) {
    return '1 month ago';
  } else if (span > 1) {
    return `${span} months ago`;
  }
  span = Math.floor(secondsBetween / 86400);
  if (span === 1) {
    return '1 day ago';
  } else if (span > 1) {
    return `${span} days ago`;
  }
  span = Math.floor(secondsBetween / 3600);
  if (span === 1) {
    return '1 hour ago';
  } else if (span > 1) {
    return `${span} hours ago`;
  }
  span = Math.floor(secondsBetween / 60);
  if (span === 1) {
    return '1 minute ago';
  } else if (span > 1) {
    return `${span} minutes ago`;
  }
  return 'just now';
};

const readyComments = (commentData, sortFunc) => {
  let result = [];
  commentData.sort((a, b) => a.parentId - b.parentId);
  for (let i = 0; i < commentData.length; i++) {
    let comment = commentData[i];
    if (comment.parentId === 0) {
      result.push({
        id: comment.id,
        username: comment.username,
        text: comment.text,
        commentDate: comment.commentDate,
        likes: comment.likes,
        dislikes: comment.dislikes,
        image: comment.image,
        replies: []
      });
    } else {
      for (let j = 0; j < result.length; j++) {
        if (comment.parentId === result[j].id) {
          result[j].replies.push({
            id: comment.id,
            username: comment.username,
            text: comment.text,
            commentDate: comment.commentDate,
            likes: comment.likes,
            dislikes: comment.dislikes,
            image: comment.image,
          });
          break;
        } else {
          for (let k = 0; k < result[j].replies.length; k++) {
            let parentReply = result[j].replies[k];
            if (comment.parentId === parentReply.id) {
              result[j].replies.push({
                id: comment.id,
                username: comment.username,
                text: `@${parentReply.username} ${comment.text}`,
                commentDate: comment.commentDate,
                likes: comment.likes,
                dislikes: comment.dislikes,
                image: comment.image,
              });
              break;
            }
          }
        }
      }
    }
  }
  result.forEach((comment) => {
    comment.replies.sort((a, b) => new Date(a.commentDate) - new Date(b.commentDate));
  });
  result.sort(sortFunc);
  return result;
};


module.exports.getVideoData = getVideoData;
module.exports.isUserSubscribed = isUserSubscribed;
module.exports.subscribeChange = subscribeChange;
module.exports.readyComments = readyComments;
module.exports.timeSince = timeSince;
module.exports.commentPost = commentPost;
module.exports.commentFeelingPost = commentFeelingPost;
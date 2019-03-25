import Comment from './comment.jsx';
import React from 'react';

const CommentBody = (props) => {
  
  let comments = [];
  for (let i = 0; i < props.userPosts.length; i++) {
    let userPostData = props.userPosts[i];
    comments.push(<Comment liked={false} disliked={false} id={userPostData.id} video={props.video} prependUserComment={props.prependUserComment} image={userPostData.image} userImage={props.userImage} username={userPostData.username} commentDate={userPostData.commentDate} likes={userPostData.likes} dislikes={userPostData.dislikes} text={userPostData.text} replies={userPostData.replies} />);
  }
  for (let i = 0; i < props.commentData.length; i++) {
    let data = props.commentData[i];
    let liked = false;
    let disliked = false;
    for (let j = 0; j < props.userCommentFeelings.length; j++) {
      if (props.userCommentFeelings[j].commentId === data.id) {
        if (props.userCommentFeelings[j].feeling) {
          liked = true;
        } else {
          disliked = true;
        }
      }
    }
    comments.push(<Comment liked={liked} disliked={disliked} id={data.id} video={props.video} prependUserComment={props.prependUserComment} image={data.image} userImage={props.userImage} username={data.username} commentDate={data.commentDate} likes={data.likes} dislikes={data.dislikes} text={data.text} replies={data.replies} userCommentFeelings={props.userCommentFeelings} />);
  }

  return (
    <div>
      {comments}
    </div>
  );
};

export default CommentBody;
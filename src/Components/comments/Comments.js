import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./Comments.css";
import { FaComments } from "react-icons/fa";
import { loadCommentsForPostId, selectComments } from "../../features/subreddit/subredditSlice";

const Comments = ({postId,permalink,num_comments }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch=useDispatch();
  const comments=useSelector(selectComments);
  const loadComments=loadCommentsForPostId(permalink,postId);

  const handleClick=()=>{
    let fetchedComments=comments.find(commentObj=>commentObj.postId===postId);
    if(!fetchedComments){
      loadComments(dispatch);
    }
    setShowComments(!showComments);
  }

    return (
      <div>
      <button onClick={handleClick}>
        <FaComments />
      </button>
      {num_comments}
      {(showComments) &&
        comments.find(commentObj=>commentObj.postId===postId).comments.map((comment,index) => {
          return (
            <div key={index} className="comment">
              <h5>{comment.author}</h5>
              <p>{comment.body}</p>
            </div>
          );
        })}
    </div>
  );

};

export default Comments;

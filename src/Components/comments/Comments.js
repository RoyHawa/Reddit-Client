import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Comments.css";
import { FaComments } from "react-icons/fa";
import {
  loadCommentsForPostId,
  selectComments,
  isLoadingComments,
  errorLoadingComments,
} from "../../features/subreddit/subredditSlice";

const Comments = ({ postId, permalink, num_comments }) => {
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const loadComments = loadCommentsForPostId(permalink, postId);
  const isLoading = useSelector(isLoadingComments);
  const errorLoading = useSelector(errorLoadingComments);

  const handleClick = () => {
    let fetchedComments = comments.find(
      (commentObj) => commentObj.postId === postId
    );
    if (!fetchedComments) {
      loadComments(dispatch);
    }
    setShowComments(!showComments);
  };

  if (isLoading && showComments) {
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }else if(errorLoading){
    return <h1>Error</h1>
  } else {
    return (
      <div>
        <button onClick={handleClick}>
          <FaComments />
        </button>
        {num_comments}
        {showComments &&
          comments
            .find((commentObj) => commentObj.postId === postId)
            .comments.map((comment, index) => {
              return (
                <div key={index} className="comment">
                  <h5>{comment.author}</h5>
                  <p>{comment.body}</p>
                </div>
              );
            })}
      </div>
    );
  }
};

export default Comments;

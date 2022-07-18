import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./Comments.css";
import { FaComments } from "react-icons/fa";
import { loadCommentsForPost, selectComments } from "../../features/subreddit/subredditSlice";

const Comments = ({postId,permalink,num_comments }) => {
  const [showComments, setShowComments] = useState(false);
  // const [comments, setComments] = useState([]);
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(loadCommentsForPost(permalink,postId));
    // setComments(findComments.comments);
 
  }, [dispatch,permalink,postId]);
  
  // setComments(useSelector(selectComments[postId]));
  const comments=useSelector(selectComments);
  const handleClick=()=>{
    setShowComments(!showComments);
  }

  return (
    <div>
      <button onClick={handleClick}>
        <FaComments />
      </button>
      {/* {comments[postId].length} */}
      {showComments  &&
        comments[postId].map((comment,index) => {
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

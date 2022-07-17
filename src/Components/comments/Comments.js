import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./Comments.css";
import { FaComments } from "react-icons/fa";
import { loadCommentsForPost, selectComments } from "../../features/subreddit/subredditSlice";

const Comments = ({postId,permalink,num_comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const dispatch=useDispatch();

  useEffect(() => {
    // dispatch(loadCommentsForPost(permalink));


    // const findComments = commentsArr.find((comment) => comment.id === id);
    // setComments(findComments.comments);
  }, [dispatch,showComments]);
  
  // setComments(useSelector(selectComments[postId]));
  const handleClick=()=>{
    setShowComments(!showComments);
  }

  return (
    <div>
      <button onClick={handleClick}>
        <FaComments />
      </button>
      {/* {comments.length} */}
      {2}
      {/* {showComments &&
        comments.map((comment,index) => {
          return (
            <div key={index} className="comment">
              <h5>author name</h5>
              <p>{comment}</p>
            </div>
          );
        })} */}
    </div>
  );
};

export default Comments;

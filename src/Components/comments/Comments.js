import React, { useState, useEffect } from "react";
import { FaComments } from "react-icons/fa";
import { commentsArr } from "../../data/comments";
import "./Comments.css";

const Comments = ({ id }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const findComments = commentsArr.find((comment) => comment.id === id);
    setComments(findComments.comments);
  }, [id]);

  return (
    <div>
      <button onClick={() => setShowComments(!showComments)}>
        <FaComments />
      </button>
      {comments.length}
      {showComments &&
        comments.map((comment,index) => {
          return (
            <div key={index} className="comment">
              <h5>author name</h5>
              <p>{comment}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Comments;

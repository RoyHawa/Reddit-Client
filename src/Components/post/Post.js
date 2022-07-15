import React, { useState } from "react";
import "./Post.css";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import Comments from "../comments/Comments";

const Post = ({ id, author, title, thumbnail, created, num_comments, ups }) => {
  const [upvote, setUpvote] = useState(false);
  const [downvote, setDownvote] = useState(false);
  const [upvoteTotal, setUpvoteTotal] = useState(ups);

  const handleUpvote = () => {
    if (downvote) {
      setDownvote(false);
    }
    if (upvote) {
      setUpvoteTotal(ups);
    } else {
      setUpvoteTotal(ups + 1);
    }
    setUpvote(!upvote);
  };

  const handleDownvote = () => {
    if (upvote) {
      setUpvote(false);
    }
    if (downvote) {
      setUpvoteTotal(ups);
    } else {
      setUpvoteTotal(ups - 1);
    }
    setDownvote(!downvote);
  };

  return (
    <div className="post">
      <div className="upvotes">
        <button onClick={handleUpvote} className={upvote ? "active" : ""}>
          <ImArrowUp />
        </button>
        <h6>{upvoteTotal}</h6>
        <button onClick={handleDownvote} className={downvote ? "active" : ""}>
          <ImArrowDown />
        </button>
      </div>
      <div className="info">
        <h6>
          Posted by {author} {created}h ago
        </h6>
        <h3>{title}</h3>
        <img alt={title} src={thumbnail} />
        <Comments id={id} num_comments={num_comments} />
      </div>
    </div>
  );
};

export default Post;

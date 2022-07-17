import React, { useState } from "react";
import { ImArrowUp, ImArrowDown } from "react-icons/im";

const Upvote = ({ ups }) => {
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
    <div className="upvotes">
      <button onClick={handleUpvote} className={upvote ? "active" : ""}>
        <ImArrowUp />
      </button>
      <h6>{upvoteTotal}</h6>
      <button onClick={handleDownvote} className={downvote ? "active" : ""}>
        <ImArrowDown />
      </button>
    </div>
  );
};

export default Upvote;

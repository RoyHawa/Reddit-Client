import React from "react";
import "./Subreddits.css";
import { subreddits } from "../../data/subreddits";
import Subreddit from "../../features/subreddit/Subreddit.js";

const Subreddits = () => {
  const handleClick=(subreddit)=>{
    console.log(subreddit);
  }
  
  return (
    <div className="subreddits">
      <h2>Subreddits</h2>
      <ul>
        {subreddits.map((subreddit,index) => {
          return <li key={index} onClick={()=>handleClick(subreddit)}>{subreddit}</li>;
        })}
      </ul>
    </div>
  );
};

export default Subreddits;

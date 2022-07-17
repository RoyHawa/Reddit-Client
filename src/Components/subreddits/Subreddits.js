import React, { useState,useEffect } from "react";
import "./Subreddits.css";
import { useDispatch,useSelector } from "react-redux";
import { changeSubreddit,selectSubreddits,loadSubredditOptions } from "../../features/subreddit/subredditSlice";

const Subreddits = () => {
  const [currentSubreddit, setCurrentSubreddit] = useState("Home");
  const subreddits=useSelector(selectSubreddits);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSubredditOptions());
  }, [dispatch,currentSubreddit]);

  const handleClick = (subreddit) => {
    if (subreddit !== currentSubreddit) {
      dispatch(changeSubreddit(subreddit));
      setCurrentSubreddit(subreddit);
    }
  };

  return (
    <div className="subreddits">
      <h2>Subreddits</h2>
      <ul>
        {subreddits.map((subreddit, index) => {
          return (
            <li key={index} onClick={() => handleClick(subreddit)}>
             <div className="icon"> {subreddit.icon && <img alt={'icon'} src={subreddit.icon}/>}</div>{subreddit.display_name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Subreddits;

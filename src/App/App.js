import React from "react";
import "./App.css";
import SearchBar from "../features/searchBar/SearchBar";
import Subreddit from "../features/subreddit/Subreddit";
import Subreddits from "../features/subreddits/Subreddits";

function App() {
  return (
    <div className="app">
      <SearchBar />

      <div className="content">
        <Subreddits />
        <Subreddit />
      </div>
    </div>
  );
}

export default App;

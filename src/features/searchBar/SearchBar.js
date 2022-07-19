import React, { useState } from "react";
import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearchTerm,
  setSearchTerm,
  clearSearchTerm,
} from "./searchBarSlice";
import {
  loadPostsForSubreddit,
  searchForPost,
  resetPostsandComments,
} from "../subreddit/subredditSlice";
import { selectSubreddit } from "../subreddits/subredditsSlice";
import { GrFormClose } from "react-icons/gr";

const SearchBar = () => {
  const [searching, setSearchStatus] = useState(false);
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const subreddit = useSelector(selectSubreddit);

  const search = () => {
    if (searchTerm) {
      dispatch(searchForPost(searchTerm));
      setSearchStatus(true);
    }
  };

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const clearSearchandLoadPosts = () => {
    dispatch(clearSearchTerm());
    if (searching) {
      dispatch(resetPostsandComments());
      dispatch(loadPostsForSubreddit(subreddit));
    }
    setSearchStatus(false);
  };

  return (
    <div className="searchBar">
      {searchTerm.length > 0 && (
        <button onClick={clearSearchandLoadPosts}>
          <GrFormClose />
        </button>
      )}
      <input
        type={"text"}
        placeholder="search for post"
        value={searchTerm}
        onChange={(e) => handleChange(e)}
      ></input>
      <button onClick={search}>
        <FiSearch />
      </button>
    </div>
  );
};

export default SearchBar;

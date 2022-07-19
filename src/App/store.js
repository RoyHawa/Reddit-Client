import { configureStore } from '@reduxjs/toolkit';
import subredditReducer from '../features/subreddit/subredditSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';
import searchBarReducer from '../features/searchBar/searchBarSlice';

export const store = configureStore({
  reducer: {
    subreddit:subredditReducer,
    subreddits:subredditsReducer,
    search:searchBarReducer
  },
});

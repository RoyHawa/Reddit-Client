import { configureStore } from '@reduxjs/toolkit';
import subredditReducer from '../features/subreddit/subredditSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';

export const store = configureStore({
  reducer: {
    subreddit:subredditReducer,
    subreddits:subredditsReducer
  },
});

import { configureStore } from '@reduxjs/toolkit';
import subredditReducer from '../features/subreddit/subredditSlice';

export const store = configureStore({
  reducer: {
    subreddit:subredditReducer
  },
});

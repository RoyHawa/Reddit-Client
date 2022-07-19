import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = "https://www.reddit.com";

export const loadSubredditOptions = createAsyncThunk(
  "subreddit/loadSubredditOptions",
  async () => {
    const response = await fetch(`${baseURL}/subreddits.json`);
    const jsonResponse = await response.json();
    return jsonResponse.data.children;
  }
);

const subredditsSlice = createSlice({
  name: "subreddits",
  initialState: {
    currentSubreddit: "Home",
    subreddits: [],
    isLoadingSubreddits: false,
    errorLoadingSubreddits: false,
  },
  reducers: {
    changeSubreddit: (state, action) => {
      state.currentSubreddit = action.payload.display_name;

    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSubredditOptions.pending, (state) => {
        state.isLoadingSubreddits = true;
        state.errorLoadingSubreddits = false;
      })
      .addCase(loadSubredditOptions.fulfilled, (state, action) => {
        state.isLoadingSubreddits = false;
        state.errorLoadingSubreddits = false;
        state.subreddits = action.payload.map((subreddit, index) => {
          return {
            display_name: subreddit.data.display_name,
            icon: subreddit.data.icon_img,
          };
        });
      })
      .addCase(loadSubredditOptions.rejected, (state) => {
        state.isLoadingSubreddits = false;
        state.errorLoadingSubreddits = true;
      });
  },
});


export const selectSubreddit = (state) => state.subreddits.currentSubreddit;
export const selectSubreddits = (state) => state.subreddits.subreddits;
export const {changeSubreddit} = subredditsSlice.actions;

export default subredditsSlice.reducer;
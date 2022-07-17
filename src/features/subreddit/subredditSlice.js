import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const baseURL = "https://www.reddit.com";

export const loadPostsForSubreddit = createAsyncThunk(
  "subreddit/loadPostsForSubreddit",
  async (subreddit) => {
    const response = await fetch(`${baseURL}/r/${subreddit}.json`);

    const jsonResponse = await response.json();
    return jsonResponse.data.children;
  }
);

export const loadCommentsForPost = createAsyncThunk(
  "subreddit/loadCommentsForPost",
  async (permalink) => {
    const response = await fetch(`${baseURL}/${permalink}.json`);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse.data;
  }
);

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: {
    subreddit: "Home",
    posts: [],
    commentsByPostId: [],
    isLoading: false,
    error: false,
  },
  reducers: {
    changeSubreddit: (state, action) => {
      state.subreddit = action.payload;
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPostsForSubreddit.pending, (state, action) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(loadPostsForSubreddit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        if (state.posts.length === 0) {
          action.payload.forEach((post, index) => {
            state.posts.push({
              id: index,
              author: post.data.author,
              url_overridden_by_dest: post.data.url_overridden_by_dest,
              title: post.data.title,
              ups: post.data.ups,
              num_comments: post.data.num_comments,
              post_hint: post.data.post_hint,
              permalink: post.data.permalink,
            });
          });
        }
      })
      .addCase(loadPostsForSubreddit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        console.log("error in loadPostsForSubreddit");
      });
  },
});

export const selectPosts = (state) => state.subreddit.posts;
export const selectComments = (state) => state.subreddit.commentsByPostId;
export const selectSubreddit = (state) => state.subreddit.subreddit;

export const { changeSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;

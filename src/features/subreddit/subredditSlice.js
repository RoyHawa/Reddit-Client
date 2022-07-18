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
    return jsonResponse;
  }
);

export const loadSubredditOptions = createAsyncThunk(
  "subreddit/loadSubredditOptions",
  async () => {
    const response = await fetch(`${baseURL}/subreddits.json`);
    const jsonResponse = await response.json();
    return jsonResponse.data.children;
  }
);

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: {
    subreddit: "Home",
    subreddits: [],
    posts: [],
    commentsByPostId: [],
    isLoadingPosts: false,
    errorLoadingPosts: false,
    isLoadingSubreddits: false,
    errorLoadingSubreddits: false,
    isLoadingComments: false,
    errorLoadingComments: false,
  },
  reducers: {
    changeSubreddit: (state, action) => {
      state.subreddit = action.payload.display_name;
      state.posts = [];
      state.commentsByPostId=[];
    },
  },
  extraReducers: (builder) => {
    builder //posts
      .addCase(loadPostsForSubreddit.pending, (state, action) => {
        state.isLoadingPosts = true;
        state.errorLoadingPosts = false;
      })
      .addCase(loadPostsForSubreddit.fulfilled, (state, action) => {
        state.isLoadingPosts = false;
        state.errorLoadingPosts = false;
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
      .addCase(loadPostsForSubreddit.rejected, (state) => {
        state.isLoadingPosts = false;
        state.errorLoadingPosts = true;
      }) //subreddit options
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
      }) //comments
      .addCase(loadCommentsForPost.pending, (state) => {
        state.isLoadingComments = true;
        state.errorLoadingComments = false;
      })
      .addCase(loadCommentsForPost.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.errorLoadingComments = false;
        state.commentsByPostId.push(action.payload[1].data.children.map((comment)=>{
          return {author:comment.data.author,
          body:comment.data.body,
        created:comment.data.created}
        }));
        
      })
      .addCase(loadCommentsForPost.rejected,(state)=>{
        state.isLoadingComments=false;
        state.errorLoadingComments=true;
      });
  },
});

export const selectPosts = (state) => state.subreddit.posts;
export const selectComments = (state) => state.subreddit.commentsByPostId;
export const selectSubreddit = (state) => state.subreddit.subreddit;
export const selectSubreddits = (state) => state.subreddit.subreddits;

export const { changeSubreddit } = subredditSlice.actions;
export default subredditSlice.reducer;

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

export const loadCommentsForPostId = (permalink, postId) => {
  return (dispatch) => {
    dispatch(subredditSlice.actions.createCommentObject(postId));
    dispatch(loadCommentsForPost(permalink));
  };
};

export const subredditSlice = createSlice({
  name: "subreddit",
  initialState: {
    posts: [],
    commentsByPostId: [],
    isLoadingPosts: false,
    errorLoadingPosts: false,
    isLoadingComments: false,
    errorLoadingComments: false,
  },
  reducers: {
    createCommentObject: (state, action) => {
      if (
        !state.commentsByPostId.find(
          (commentObj) => commentObj.postId === action.payload
        )
      ) {
        state.commentsByPostId.push({
          postId: action.payload,
          comments: [],
          fetched_comments: false,
        });
      }
    },
    resetPostsandComments: (state) => {
      state.posts = [];
      state.commentsByPostId = [];
    },
    searchForPost: (state, action) => {
      state.posts = state.posts.filter((post) =>
        post.title.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
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
      })
      .addCase(loadCommentsForPost.pending, (state) => {
        state.isLoadingComments = true;
        state.errorLoadingComments = false;
      })
      .addCase(loadCommentsForPost.fulfilled, (state, action) => {
        state.isLoadingComments = false;
        state.errorLoadingComments = false;

        const commentObj = state.commentsByPostId.find(
          (comment) => comment.fetched_comments === false
        );
        commentObj.comments = action.payload[1].data.children.map((comment) => {
          return {
            author: comment.data.author,
            body: comment.data.body,
          };
        });
        commentObj.fetched_comments = true;
      })
      .addCase(loadCommentsForPost.rejected, (state) => {
        state.isLoadingComments = false;
        state.errorLoadingComments = true;
      });
  },
});

export const selectPosts = (state) => state.subreddit.posts;
export const isLoadingPosts = (state) => state.subreddit.isLoadingPosts;
export const errorLoadingPosts = (state) => state.subreddit.errorLoadingPosts;

export const selectComments = (state) => state.subreddit.commentsByPostId;
export const isLoadingComments = (state) => state.subreddit.isLoadingComments;
export const errorLoadingComments = (state) =>
  state.subreddit.errorLoadingComments;

export const { createCommentObject, resetPostsandComments, searchForPost } =
  subredditSlice.actions;
export default subredditSlice.reducer;

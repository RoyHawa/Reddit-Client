import { createSlice,createAsyncThunk} from "@reduxjs/toolkit";
const baseURL='https://www.reddit.com/r/';


export const loadPostsForSubreddit=createAsyncThunk('subreddit/loadPostsForSubreddit',
async (subreddit)=>{
    const response=await fetch(`${baseURL}${subreddit}.json`);
    //  return JSON.stringify(response);
    return response;
})

export const subredditSlice=createSlice({
    name:'subreddit',
    initialState:{
        subreddit:'Home',
        posts:[],
        isLoading:false,
        error:false
    },
    reducers:{
  
    },
    extraReducers:(builder)=>{
        builder.addCase(loadPostsForSubreddit.pending,(state,action)=>{
            state.isLoading=true;
            state.error=false;
        })
        .addCase(loadPostsForSubreddit.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.error=false;
            state.posts=action.payload.data;
            // console.log(`state.posts=${state.posts}`);
        })
        .addCase(loadPostsForSubreddit.rejected,(state,action)=>{
            state.isLoading=false;
            state.error=true;
            console.log('error in loadPostsForSubreddit');
        })
    }
})

export const selectPosts=state=>state.subreddit.posts;

export default subredditSlice.reducer;
// export {}



import React,{useEffect} from 'react';
import './Subreddit.css';
import {posts} from '../../data/posts';
import Post from '../../Components/post/Post';
import {useDispatch,useSelector} from 'react-redux';
import { loadPostsForSubreddit,selectPosts } from './subredditSlice';


const Subreddit = () => {
  const dispatch=useDispatch();
  
  useEffect(() => {
    dispatch(loadPostsForSubreddit('ksi'));
  }, [dispatch]);
  
  const posts=useSelector(selectPosts);
  console.log(posts);
  return (
    <div className='subreddit'>
      {/* <h2>subreddit</h2> */}
      {
        posts.map((post)=>{
          return (
            <Post key={post.id} {...post}/>
          )
        })
      }
      
        {
        posts.map((post)=>{
          return (
            <Post key={post.id} {...post}/>
          )
        })
      }
    </div>
  );
}

export default Subreddit;
blabfsjkflsdj
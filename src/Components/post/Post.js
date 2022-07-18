import React from "react";
import "./Post.css";
import Upvote from "../upvote/Upvote";
import Comments from "../comments/Comments";

const Post = ({
  id,
  author,
  title,
  url_overridden_by_dest,
  ups,
  num_comments,
  post_hint,
  permalink
}) => {
  function media(post_hint) {
    switch (post_hint) {
      case "image":
        return <img alt={title} src={url_overridden_by_dest} />;
      case "link":
        return <a href={url_overridden_by_dest}>{url_overridden_by_dest}</a>;
      default:
        return;
    }
  }

  return (
    <div className="post">
      <Upvote ups={ups} />
      <div className="info">
        <h6>Posted by {author}</h6>
        <h3>{title}</h3>
        {media(post_hint)}
        <hr/>
        <Comments postId={id} num_comments={num_comments} permalink={permalink}/> 
      </div>
    </div>
  );
};

export default Post;

import React from "react";
import "./post.css";

function Post(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="title">{props.title}</h2>
        <img className="circle-img" src="https://norwich.cityofsanctuary.org/wp-content/uploads/sites/88/2020/04/newsletter2.png" alt="post_img" />
      </div>
      <div className="bottom">
        <p className="postContent">{props.post}</p>
        
      </div>
    </div>
  );
}

export default Post;

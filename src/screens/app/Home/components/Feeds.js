import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FeedsPost from "./FeedsPost";
import "./Feeds.scss";
import { POSTS } from "../configs";

function Feeds() {
  const [post, setPost] = useState(POSTS);

  function getPost() {}

  return (
    <InfiniteScroll
      dataLength={post.length}
      next={getPost}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {post.map((i, index) => {
        return (
          <div key={i.id} className="feeds">
            <FeedsPost post={i}></FeedsPost>
          </div>
        );
      })}
    </InfiniteScroll>
  );
}

export default Feeds;

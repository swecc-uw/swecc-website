import React, { useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";
import "../CSS/Posts.css";

const postsData = [
  "https://www.instagram.com/p/C2-o7roPbfN",
  "https://www.instagram.com/p/C23PyAWPYdW",
  "https://www.instagram.com/p/CyRondZPVVS",
  "https://www.instagram.com/p/Cxum20yOlkQ",
  "https://www.instagram.com/p/CxrxWcQLpSb",
  "https://www.instagram.com/p/C7uRAftvEKV/",
  "https://www.instagram.com/p/C7U6mnQy4_1/",
  "https://www.instagram.com/p/CHQ5L0hAFz5", // Additional posts
  "https://www.instagram.com/p/CIL6ZWthkXl",
];

export function Posts() {
  const [page, setPage] = useState(0);
  const postsPerPage = 3;

  const prev = () => {
    setPage((prevPage) => (prevPage === 0 ? 2 : prevPage - 1));
  };

  const next = () => {
    setPage((prevPage) => (prevPage === 2 ? 0 : prevPage + 1));
  };

  const getPostsForPage = (page) => {
    const start = page * postsPerPage;
    return postsData.slice(start, start + postsPerPage);
  };

  const currentPosts = getPostsForPage(page);

  return (
    <div className="carousel">
      <button className="nav-button left" onClick={prev}>
        {"<"}
      </button>
      <div className="posts">
        {currentPosts.map((url, index) => (
          <InstagramEmbed key={index} className="instaPost" url={url} />
        ))}
      </div>
      <button className="nav-button right" onClick={next}>
        {">"}
      </button>
    </div>
  );
}

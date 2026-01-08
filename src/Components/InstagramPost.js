import React, { useEffect, useState } from "react";
import BeholdWidget from "@behold/react";
import { fetch_top_n_instagram_post } from "./Utils/InstagramFetcher";
import { links } from "./Utils";

function InstagramPost({ post }) {
  return (
    <div className="instaPost">
      <a href={post.permalink} target="_blank" rel="noopener noreferrer" className="instaPost-link">
        <div className="instaPost-media">
          <img
            src={post.media_type === "VIDEO" ? (post.thumbnail_url || post.media_url) : post.media_url}
            alt={post.caption || "Instagram post"}
            className="instaPost-image"
          />
          {post.media_type === "VIDEO" && (
            <div className="instaPost-play-overlay">
              <span className="material-symbols-outlined instaPost-play-icon">play_circle</span>
            </div>
          )}
        </div>
        {post.caption && (
          <p className="instaPost-caption">
            {post.caption.substring(0, 100)}{post.caption.length > 100 ? '...' : ''}
          </p>
        )}
      </a>
    </div>
  );
}

function InstagramPostsWidget() {
  const [instagramPosts, setInstagramPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const posts = await fetch_top_n_instagram_post();
        setInstagramPosts(posts);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        setInstagramPosts(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // If still loading or posts failed to fetch, use BeholdWidget as fallback
  if (isLoading || !instagramPosts || instagramPosts.length === 0) {
    return <BeholdWidget feedId={links.config.beholdFeedId} />;
  }

  // Render custom Instagram posts
  return (
    <div className="posts-carousel">
      <div className="posts">
        {instagramPosts.map((post) => (
          <InstagramPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default InstagramPostsWidget;

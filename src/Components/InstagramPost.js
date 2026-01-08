import React, { useEffect, useState } from "react";
import BeholdWidget from "@behold/react";
import { links } from "./Utils";
import { fetch_top_n_instagram_post } from "./Utils/InstagramFetcher";

function InstagramPost({ post }) {
  const isVideo = post.media_type === "VIDEO";
  const isCarousel = post.media_type === "CAROUSEL_ALBUM";

  const postType = isVideo ? 'video' : isCarousel ? 'album' : 'image';

  return (
    <div className={`post post--hover-icon post--${postType}`}>
      <a
        href={post.permalink}
        target="_blank"
        rel="noopener noreferrer"
        draggable="false"
        aria-label={`${post.media_type.toLowerCase()}, Instagram post`}
      >
        <img
          src={isVideo ? (post.thumbnail_url || post.media_url) : post.media_url}
          alt={post.caption || "Instagram post"}
          draggable="false"
        />
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
    <div className="instagram-grid">
      <div className="instagram-grid__posts">
        {instagramPosts.map((post) => (
          <InstagramPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default InstagramPostsWidget;

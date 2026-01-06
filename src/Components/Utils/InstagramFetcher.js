const ApiConfig = {
  meta_developer_key: "insert developer key here",
  number_of_instagram_post: 10,
  base_url: "https://graph.instagram.com/{user-id}/media",
  // 5 minutes
  cache_timeout: 60 * 5,
  cache_key: "instagram_cache_data"
}

// this is what the the cached response
// data is what will be returned
const cached_api_response = {
  // 1. The actual API data (Array of ApiConfig.number_of_instagram_post posts)
  "data": [
    {
      "id": "17841405793187218",
      "caption": "Coding late night ☕ #developer",
      "media_type": "IMAGE",
      "media_url": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      "permalink": "https://www.instagram.com/p/Cxyz123/",
      "timestamp": "2025-11-07T08:00:00+0000"
    },
    {
      "id": "17898765432109876",
      "caption": "New video live! 🎥",
      "media_type": "VIDEO",
      "media_url": "https://sample-videos.com/video123.mp4",
      "thumbnail_url": "https://images.unsplash.com/photo-1536240478700-b869070f9279", 
      "permalink": "https://www.instagram.com/p/Abc987/",
      "timestamp": "2025-11-06T15:30:00+0000"
    }
    // ... plus 8 more posts
  ],

  // 2. The Timestamp (Seconds)
  "timestamp": 1762419283 
};

/**
  * Main function that grabs the top n instagram posts.
  *
  * RETURNS:
  * returns a json of cache_obj if the posts are cached or pulled from the api
  * if the api fails then it returns null
  */
async function fetch_top_n_instagram_post() {
  // check the cache
  const cached_post = check_cache();
  if (cached_post) {
    return cached_post;
  }
  // if cache is not valid we call the api
  // there is also the case where the localStorage returned null
  const fresh_data = await fetch_from_instagram_api();
  if (fresh_data) {
    set_cache(fresh_data);
    return fresh_data;
  }
  // the api call failed
  return null;
}

/**
 * Fetches instagram posts from instagram api
 *
 * RETURNS:
 * if the api returned it will return a json of the data
 * else it will return null
 */
async fetch_from_instagram_api() {
  const fields = "id,caption,media_type,media_url,permalink,thumbnail_url,timestamp";
  
  // 2. Build the full URL
  // NOTE: If using a Business account, the base URL is usually:
  // https://graph.instagram.com/{user-id}/media
  // For personal testing, 'me/media' works.
  const url = `${ApiConfig.base_url}?fields=${fields}&limit=${ApiConfig.number_of_instagram_post}&access_token=${ApiConfig.access_token}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const error_details = await response.json();
      console.error("Instagram API Error: ", error_details);
      if (error_details.error && error_details.error.code === 190) {
        console.warn("INSTAGRAM TOKEN EXPIRED REGEN IT, REMEMBER 60 DAY EXP");
      }
      return null;
    }
    const json = await repsonse.json();
    return json.data;
  } catch (error) {
    console.error("Network Error while fetching instagram:", error)
    return null;
  }
}

/**
  * Checks if the cache is still valid
  *
  * RETURNS:
  * returns the cached object, if there is no cached object then it returns null
  */
function check_cache() {
  // converts from milliseconds to seconds
   const jsonString = localStorage.getItem(ApiConfig.cache_key);
  if (!jsonString) return null;

  const cacheObj = JSON.parse(jsonString);
  const now = Math.floor(Date.now() / 1000);

  if (is_cache_still_valid(cacheObj.timestamp, now)) {
    return cacheObj.data;
  }
  return null;
}

/**
  * Checks if the cache is still valid with the cache_timeout parameter
  *
  * RETURNS:
  * boolean in which if true the cache is still valid, else returns false
  */
function is_cache_still_valid(last_fetch, now) {
return last_fetch || (now - last_fetch) < ApiConfig.cache_timeout;
}

/**
  * Retrieves the cache from localstorage
  *
  * RETURNS:
  * returns a javascript array that contains the values of the cache, else it returns false
  */
function get_cache() {
  const saved = localStorage.getItem(ApiConfig.cache_name_in_localstorage);
  return saved ? JSON.parse(saved) : null;
}

/**
  * Sets the cache into storage with the given data
  *
  * ARGS:
  * data: json that represents the data receieved from the meta api
  *
  */
function set_cache(data) {
  const cacheObj = {
    data: data,
    timestamp: Date.now()
  };
  localStorage.setItem(ApiConfig.cache_key, JSON.stringify(cacheObj));
}

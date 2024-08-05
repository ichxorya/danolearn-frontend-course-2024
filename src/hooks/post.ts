import { useEffect, useState } from "react";
import { Post } from "../types/post";
import { getPosts } from "../services/apis/posts";

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const handleGetPosts = async () => {
    try {
      setLoadingPosts(true);
      const data = await getPosts();
      setPosts(data.posts);
    } finally {
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    handleGetPosts();
  }, []);

  return {
    posts,
    loadingPosts,
  };
};

import axios from "axios";
import { GetPostsResponse, Post, PostFieldType } from "../../types/post";

const BASE_API_ENDPOINT = "https://training-program.dev.tekoapis.net/api/v1";

// C: Create.
export const createPost = async (data: PostFieldType) => {
  const res = await axios.post(`${BASE_API_ENDPOINT}/posts`, data);
  return res.data;
};

// R: Read.
export const getPosts =
  async (
    page: number = 1,
    pageSize: number = 12
  ): Promise<GetPostsResponse> => {
    const res = await axios.get(`${BASE_API_ENDPOINT}/posts`, {
      params: { page, pageSize },
    });
    return res.data;
  };

export const getPostById = async (id: number): Promise<Post> => {
  const res = await axios.get(`${BASE_API_ENDPOINT}/posts/${id}`);
  return res.data;
};

// U: Update.
export const updatePost = async (
  id: number,
  title: string,
  description: string
) => {
  const res = await axios.put(`${BASE_API_ENDPOINT}/posts/${id}`, {
    title,
    description,
  });
  return res.data;
};

// D: Delete.
export const deletePost = async (id: number) => {
  const res = await axios.delete(`${BASE_API_ENDPOINT}/posts/${id}`);
  return res.data;
};

import axios from "axios";
import { GetPostsResponse, Post, PostFieldType, PostQuery } from "types/post";

const BASE_API_ENDPOINT = "https://training-program.dev.tekoapis.net/api/v1";

// C: Create.
export const createPost = async (data: PostFieldType): Promise<Post> => {
  const res = await axios.post(`${BASE_API_ENDPOINT}/posts`, data);
  return res.data;
};

// R: Read.
export const getPosts = async (query: PostQuery): Promise<GetPostsResponse> => {
  return axios
    .get(`${BASE_API_ENDPOINT}/posts`, { params: query })
    .then((res) => res.data);
};

export const getPostDetail = async (id: number): Promise<Post> => {
  const res = await axios.get(`${BASE_API_ENDPOINT}/posts/${id}`);
  return res.data;
};

// U: Update.
export const updatePost = async (
  id: number,
  data: PostFieldType
): Promise<Post> => {
  const res = await axios.put(`${BASE_API_ENDPOINT}/posts/${id}`, data);
  return res.data;
};

// D: Delete.
export const deletePost = async (id: number): Promise<string> => {
  const res = await axios.delete(`${BASE_API_ENDPOINT}/posts/${id}`);
  return res.data;
};

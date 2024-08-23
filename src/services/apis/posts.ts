import axios from "axios";
import { GetPostsResponse, Post, PostFieldType, PostQuery } from "types/post";

const BASE_API_ENDPOINT = "https://training-program.dev.tekoapis.net/api/v1";

export const getPosts = async (query: PostQuery): Promise<GetPostsResponse> => {
  return axios
    .get(`${BASE_API_ENDPOINT}/posts`, { params: query })
    .then((res) => res.data);
};

export const getPostDetail = (id: number): Promise<Post> => {
  return axios.get(`${BASE_API_ENDPOINT}/posts/${id}`).then((res) => res.data);
};

export const createPost = (data: PostFieldType): Promise<Post> => {
  return axios.post(`${BASE_API_ENDPOINT}/posts`, data).then((res) => res.data);
};

export const updatePost = (id: number, data: PostFieldType): Promise<Post> => {
  return axios
    .put(`${BASE_API_ENDPOINT}/posts/${id}`, data)
    .then((res) => res.data);
};

export const deletePost = (id: number): Promise<string> => {
  return axios
    .delete(`${BASE_API_ENDPOINT}/posts/${id}`)
    .then((res) => res.data);
};

import axios from "axios";
import { GetPostsResponse } from "../../types/post";

const BASE_API_ENDPOINT = "https://training-program.dev.tekoapis.net/api/v1";

export const getPosts = async (): Promise<GetPostsResponse> => {
  const res = await axios.get(`${BASE_API_ENDPOINT}/posts`);
  return res.data;
};

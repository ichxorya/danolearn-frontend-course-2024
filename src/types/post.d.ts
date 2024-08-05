export interface Post {
  id: number;
  title: string;
  description: string;
}

export type GetPostsResponse = {
  posts: Post[];
  total: number;
};

export type PostFieldType = {
  title: string;
  description: string;
};

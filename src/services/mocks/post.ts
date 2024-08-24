export const getPostsMock = {
  posts: [
    {
      id: 1,
      title: "Post 1",
      description: "This is post 1",
    },
    {
      id: 2,
      title: "Post 2",
      description: "This is post 2",
    },
  ],
  total: 2,

  addPost: jest.fn((newPost) => {
    getPostsMock.posts.push(newPost);
    getPostsMock.total += 1;
  }),
};

export const createPostMock = jest.fn(async (data) => {
  const newPost = {
    id: getPostsMock.total + 1,
    ...data,
  };
  getPostsMock.addPost(newPost);
  return newPost;
});

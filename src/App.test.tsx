import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import axios from "axios";
import App from "./App";
import { getPostsMock, createPostMock } from "./services/mocks/post";

// Mock jest and set the type.
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock CRUD operations.
// Mock createPost.
mockedAxios.post.mockResolvedValue({
  data: createPostMock,
});

// Mock getPosts.
mockedAxios.get.mockResolvedValue({
  data: getPostsMock,
});

// test("fetches and displays post data in post cards", async () => {
//   // Arrange.
//   render(<App />);

//   // Act.
//   await screen.findAllByTestId("card-post");

//   // Assert.
//   expect(screen.getAllByTestId("card-post")).toHaveLength(
//     getPostsMock.posts.length
//   );
// });

test("add new post", async () => {
  // Arrange.
  render(<App />);
  const user = userEvent.setup();

  // Act.
  await user.click(screen.getByRole("button", { name: /plus Add New Post/i }));
  await user.type(screen.getByRole("textbox", { name: /Title/i }), "Post 3");
  await user.type(
    screen.getByRole("textbox", { name: /Description/i }),
    "This is post 3"
  );
  await user.click(screen.getByRole("button", { name: /Submit/i }));

  // Assert.
  await screen.findAllByTestId("card-post");
  expect(screen.getAllByTestId("card-post")).toHaveLength(
    getPostsMock.posts.length + 1
  );

  // Assert the new post.
  const newPost = screen.getByText("[3] Post 3");
  const newPostDescription = screen.getByText("This is post 3");
  expect(newPost).toBeInTheDocument();
  expect(newPostDescription).toBeInTheDocument();
}, 10000);

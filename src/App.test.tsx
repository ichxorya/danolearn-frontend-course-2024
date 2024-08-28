import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import axios from "axios";
import App from "./App";
import {
  updatePostMock,
  getPostsMock,
  createPostMock,
} from "./services/mocks/post";

// Mock jest and set the type.
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
// const user = userEvent.setup();

// Mock CRUD operations.
// Mock createPost.
mockedAxios.post.mockResolvedValue({
  data: createPostMock,
});

// Mock getPosts.
mockedAxios.get.mockResolvedValue({
  data: getPostsMock,
});

// Mock updatePost.
mockedAxios.put.mockResolvedValue({
  data: updatePostMock,
});

// Mock deletePost.
mockedAxios.delete.mockResolvedValue({});

test("empty validation", async () => {
  render(<App />);
  await userEvent.click(screen.getByText("Add New Post"));
  await userEvent.click(screen.getByText("Submit"));
  expect(
    await screen.findByText("Please input the title!")
  ).toBeInTheDocument();
  expect(
    await screen.findByText("Please input the description!")
  ).toBeInTheDocument();
});

test("post title length limit", async () => {
  render(<App />);
  await userEvent.click(screen.getByText("Add New Post"));
  await userEvent.type(screen.getByLabelText("Title"), "1234567890".repeat(11));
  await userEvent.click(screen.getByText("Submit"));
  expect(
    await screen.findByText("The maximum length of title is 100!")
  ).toBeInTheDocument();
});

test("add new post", async () => {
  // Arrange.
  render(<App />);

  // Act.
  await userEvent.click(
    screen.getByRole("button", { name: /plus Add New Post/i })
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /Title/i }),
    "Post 3"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /Description/i }),
    "This is post 3"
  );
  await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

  // Assert.
  const newPost = screen.getByText("[3] Post 3");
  const newPostDescription = screen.getByText("This is post 3");
  expect(newPost).toBeInTheDocument();
  expect(newPostDescription).toBeInTheDocument();
}, 123456);

test("update post", async () => {
  // Arrange.
  render(<App />);
  await userEvent.click(screen.queryAllByTestId("icon-edit")[0]);

  // Act.
  await userEvent.type(
    screen.getByRole("textbox", { name: /Title/i }),
    "Post 1 Updated"
  );
  await userEvent.type(
    screen.getByRole("textbox", { name: /Description/i }),
    "This is post 1 updated"
  );
  await userEvent.click(screen.getByRole("button", { name: /Submit/i }));

  // Assert.
  const updatedPost = screen.getByText("[1] Post 1 Updated");
  const updatedPostDescription = screen.getByText("This is post 1 updated");
  expect(updatedPost).toBeInTheDocument();
  expect(updatedPostDescription).toBeInTheDocument();
});

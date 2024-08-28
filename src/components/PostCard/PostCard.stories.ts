import { Meta, StoryObj } from "@storybook/react";
import PostCard from "./PostCard";
import { fn } from "@storybook/test";

const meta: Meta = {
  title: "App/PostCard",
  component: PostCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],

  args: {
    handleEditPost: fn(),
  },
} satisfies Meta<typeof PostCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    post: {
      id: 1,
      title: "Post 1",
      description: "This is post 1. Lorem upsim.",
    },
    
  },
};

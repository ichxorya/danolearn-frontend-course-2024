import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Popconfirm, Typography } from "antd";
import { Post } from "../../types/post";
import "./PostCard.css";
import { useState } from "react";
import { deletePost } from "../../services/apis/posts";

interface PostCardProps {
  post: Post;
  handleEditPost: (post: Post) => void;
  handleAfterSuccess: (isDeleted?: boolean) => void;
  handleGetPosts: () => void;
}
const { Paragraph } = Typography;

const PostCard: React.FC<PostCardProps> = (props) => {
  const { post, handleEditPost, handleAfterSuccess, handleGetPosts } = props;

  const [expanded, setExpanded] = useState(false);

  const handleConfirmDelete = () => {
    deletePost(post.id)
      .then(() => handleAfterSuccess(true))
      .then(() => handleGetPosts());
  };

  return (
    <Card
      className="post-card"
      title={`[${post.id}] ${post.title}`}
      actions={[
        <EditOutlined key="edit" onClick={() => handleEditPost(post)} />,
        <Popconfirm
          key="delete"
          title="Delete Post"
          description="Are you sure to delete this post?"
          onConfirm={handleConfirmDelete}
          okText="Confirm"
          cancelText="Cancel"
        >
          <DeleteOutlined data-testid="icon-delete-post" />
        </Popconfirm>,
      ]}
    >
      <Paragraph
        ellipsis={{
          rows: 5,
          expandable: "collapsible",
          expanded,
          symbol: (expanded: boolean) => (expanded ? "Show less" : "Show more"),
          onExpand: (_, info) => setExpanded(info.expanded),
        }}
        className="post-description"
      >
        {post.description}
      </Paragraph>
    </Card>
  );
};

export default PostCard;

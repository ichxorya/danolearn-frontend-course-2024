import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Popconfirm, PopconfirmProps, Typography } from "antd";
import { useState } from "react";
import { deletePost } from "services/apis/posts";
import { Post } from "types/post";
import "./PostCard.css";

interface PostCardProps {
  /**
   * The post data to be displayed.
   */
  post: Post;
  handleEditPost: (id: number) => void;
  handleAfterSuccess: (isDeleted?: boolean) => void;
}

const { Paragraph } = Typography;

/**
 * UI component for displaying a post card.
 */
const PostCard: React.FC<PostCardProps> = (props) => {
  const { post, handleEditPost, handleAfterSuccess } = props;
  const [loadingDeletePost, setLoadingDeletePost] = useState<boolean>(false);
  const [expanded, setExpanded] = useState(false);

  const handleConfirmDelete: PopconfirmProps["onConfirm"] = async () => {
    // Delete post
    try {
      setLoadingDeletePost(true);
      await deletePost(post.id);
    } finally {
      setLoadingDeletePost(false);
    }

    handleAfterSuccess(true);
  };

  return (
    <Card
      className="post-card"
      title={`[${post.id}] ${post.title}`}
      actions={[
        <EditOutlined
          key="edit"
          data-testid="icon-edit"
          onClick={() => handleEditPost(post.id)}
        />,
        <Popconfirm
          key="delete"
          title="Delete Post"
          description="Are you sure to delete this post?"
          onConfirm={handleConfirmDelete}
          okText="Confirm"
          cancelText="Cancel"
          okButtonProps={{
            loading: loadingDeletePost,
          }}
        >
          <DeleteOutlined data-testid="icon-delete-post" />
        </Popconfirm>,
      ]}
      data-testid="card-post"
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

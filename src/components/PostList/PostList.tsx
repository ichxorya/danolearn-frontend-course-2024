import { Button, List, Modal, Pagination } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PostCard from "../PostCard";
import { usePosts } from "../../hooks/post";
import { useState} from "react";
import PostForm from "../PostForm";
import { notification } from "antd";
import { Post } from "../../types/post";

const PostList: React.FC = () => {
  const { posts, loadingPosts, handleGetPosts } = usePosts();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [postToEditData, setPostToEditData] = useState<Post>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleAfterSuccess = (isDeleted?: boolean) => {
    if (!isDeleted) closeModal();
    notification.success({
      message: "Success",
      description: isDeleted
        ? "Delete post successfully!"
        : postToEditData
        ? "Add new post successfully!"
        : "Update post successfully!",
    });
  };

  const handleEditPost = (post: Post) => {
    setPostToEditData(post);
    showModal();
  };

  return (
    <>
      <Button
        className="btn-add"
        type="primary"
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        Add New Post
      </Button>
      <Modal
        title={postToEditData ? "Edit Post" : "Add New Post"}
        open={isModalOpen}
        footer={null}
        onCancel={closeModal}
        destroyOnClose
        width={800}
      >
        <PostForm
          postToEditData={postToEditData}
          handleAfterSuccess={handleAfterSuccess}
          handleGetPosts={handleGetPosts}
        />
      </Modal>
      <List
        pagination={{
          align: "center",
          defaultPageSize: 12,
        }}
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 4,
          xl: 4,
          xxl: 4,
        }}
        loading={loadingPosts}
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <PostCard
              handleAfterSuccess={handleAfterSuccess}
              handleEditPost={handleEditPost}
              post={post}
              handleGetPosts={handleGetPosts}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default PostList;

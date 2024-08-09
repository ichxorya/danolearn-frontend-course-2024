import { Button, Form, FormProps, Input } from "antd";
import { Post, PostFieldType } from "../../types/post";
import { useEffect } from "react";
import { createPost, updatePost } from "../../services/apis/posts";

interface PostFormProps {
  handleAfterSuccess: () => void;
  postToEditData?: Post;
  handleGetPosts: () => void;
}

const PostForm: React.FC<PostFormProps> = (props) => {
  const [form] = Form.useForm();
  const { postToEditData, handleAfterSuccess, handleGetPosts } = props;

  useEffect(() => {
    if (postToEditData) {
      const formInitialValues = {
        title: postToEditData.title,
        description: postToEditData.description,
      };
      form.setFieldsValue(formInitialValues);
    }
  }, [form, postToEditData]);

  const handleConfirmUpsert: FormProps<PostFieldType>["onFinish"] = async (
    values: PostFieldType
  ) => {
    if (postToEditData) {
      updatePost(postToEditData.id, values.title, values.description).then(() => handleGetPosts());
    } else {
      createPost(values).then(() => handleGetPosts());
    }

    handleAfterSuccess();
  };

  return (
    <Form
      form={form}
      name="post-form"
      layout="vertical"
      onFinish={handleConfirmUpsert}
      autoComplete="off"
    >
      <Form.Item<PostFieldType>
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Please input the title!",
          },
          { max: 100, message: "The maximum length of title is 100!" },
        ]}
      >
        <Input placeholder="Enter title" data-testid="input-title" />
      </Form.Item>

      <Form.Item<PostFieldType>
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            whitespace: true,
            message: "Please input the description!",
          },
        ]}
      >
        <Input.TextArea
          placeholder="Enter description"
          autoSize={{ minRows: 4 }}
          data-testid="input-description"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          data-testid="btn-submit-post-form"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PostForm;

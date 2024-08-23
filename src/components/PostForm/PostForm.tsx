import { Button, Form, FormProps, Input, Spin } from "antd";
import { usePostDetail, useUpsertPost } from "hooks/post";
import { useEffect } from "react";
import { PostFieldType } from "types/post";

interface PostFormProps {
  handleAfterSuccess: () => void;
  postToEditId?: number;
}

const PostForm: React.FC<PostFormProps> = (props) => {
  const [form] = Form.useForm();
  const { postToEditId, handleAfterSuccess } = props;
  const { postDetail, loadingPostDetail } = usePostDetail(postToEditId);
  const { loadingUpsertPost, handleCreatePost, handleUpdatePost } =
    useUpsertPost();

  useEffect(() => {
    if (postDetail) {
      const formInitialValues = {
        title: postDetail.title,
        description: postDetail.description,
      };
      form.setFieldsValue(formInitialValues);
    }
  }, [form, postDetail]);

  const handleConfirmUpsert: FormProps<PostFieldType>["onFinish"] = async (
    values
  ) => {
    // Update post
    if (postToEditId) {
      await handleUpdatePost(postToEditId, values);
    }
    // Create post
    else {
      await handleCreatePost(values);
    }

    handleAfterSuccess();
  };

  return (
    <Spin spinning={loadingPostDetail || loadingUpsertPost}>
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
    </Spin>
  );
};

export default PostForm;

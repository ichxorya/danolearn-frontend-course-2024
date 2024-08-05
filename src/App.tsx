import { Typography } from "antd";
import "./App.css";
import PostList from "./components/PostList";

const { Title } = Typography;

const App = () => {
  return (
    <>
      <Title>Post Management</Title>
      <PostList />
    </>
  );
};

export default App;

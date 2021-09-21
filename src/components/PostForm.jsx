import React, { useState } from "react";
import Input from "./UI/input/input";
import Button from "./UI/button/Button";

const PostForm = ({ create, limit }) => {
  const [post, setPost] = useState({ title: "", body: "" });
  const [index, setIndex] = useState(1);
  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      title: post.title,
      body: post.body,
      id: limit + index,
    };
    create(newPost);
    setIndex(index + 1);
    setPost({ title: "", body: "" });
  };

  return (
    <form>
      <Input
        type="text"
        value={post.title}
        placeholder="Programming Language name"
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <Input
        value={post.body}
        placeholder="Programming Language description"
        type="text"
        onChange={(e) => setPost({ ...post, body: e.target.value })}
      />
      <Button onClick={addNewPost}>Create post</Button>
    </form>
  );
};

export default PostForm;

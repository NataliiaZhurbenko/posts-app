import React from "react";
import Button from "./UI/button/Button";
import { useHistory } from "react-router-dom";

const PostItem = (props) => {
  const router = useHistory();
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        <Button
          className=""
          onClick={() => router.push(`/posts/${props.post.id}`)}
        >
          Open
        </Button>
        <Button className="" onClick={() => props.remove(props.post)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PostItem;

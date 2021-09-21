import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
  const params = useParams();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, postError] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchCommentsById, isCommentsLoading, commentsError] = useFetching(
    async (id) => {
      const response = await PostService.getCommentsById(id);
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPostById(params.id);
    fetchCommentsById(params.id);
  }, []);

  return (
    <div>
      <h1> Yo opened the page with id={params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          You have opened page {post.id}. {post.title}
        </div>
      )}

      <h1 style={{ marginTop: "25px", color: "green" }}> Comments</h1>
      {isCommentsLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((com) => {
            return (
              <div
                key={com.id}
                style={{ marginTop: "15px", marginLeft: "10px" }}
              >
                <h3>{com.email}</h3>
                <div>{com.body}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;

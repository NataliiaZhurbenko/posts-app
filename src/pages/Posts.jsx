import React, { useState, useEffect, useRef } from "react";
import PostList from "../components/PostList";
import Modal from "../components/UI/Modal/Modal";
import PostFilter from "../components/PostFilter";
import PostForm from "../components/PostForm";
import Button from "../components/UI/button/Button";
import { useSortedAndSearchedPosts } from "../hooks/useSortedAndSearchedPosts";
import { useFetching } from "../hooks/useFetching";
import { useObserver } from "../hooks/useObserver";
import { getPagesCount } from "../utils/pages";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import Select from "../components/UI/select/select";
import Pagination from "../components/UI/pagination/Pagination";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [totalPages, setTotalPages] = useState(0);
  const sortedAndSearchedPosts = useSortedAndSearchedPosts(
    posts,
    filter.sort,
    filter.query
  );

  const [fetchPosts, isLoading, postError] = useFetching(
    async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts([...posts, ...response.data]);
      const totalCount = response.headers["x-total-count"];
      setTotalPages(getPagesCount(totalCount, limit));
    }
  );

  useObserver(lastElement, isLoading, page < totalPages, () =>
    setPage(page + 1)
  );

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModalVisible(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <Button
        style={{ marginTop: "30px" }}
        onClick={() => setModalVisible(true)}
      >
        Create post
      </Button>
      <Modal visible={modalVisible} setVisible={setModalVisible}>
        <PostForm create={createPost} limit={limit} />
      </Modal>
      <hr style={{ margin: "15px" }}></hr>
      <PostFilter filter={filter} setFilter={setFilter} />

      <Select
        value={limit}
        defaultValue="Number of posts per page"
        onChange={(value) => setLimit(value)}
        options={[
          { name: "5", value: "5" },
          { name: "10", value: "10" },
          { name: "20", value: "20" },
          { name: "All posts", value: "-1" },
        ]}
      ></Select>
      {postError && <h1>Some error {postError}</h1>}
      <PostList
        posts={sortedAndSearchedPosts}
        remove={removePost}
        title="Posts"
      />
      <div style={{ height: "2opx" }} ref={lastElement}></div>
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Loader />
        </div>
      )}
      <Pagination totalPages={totalPages} page={page} setPage={setPage} />
    </div>
  );
}

export default Posts;

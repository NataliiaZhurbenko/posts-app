import { useMemo } from "react";

const useSortedPosts = (posts, sort) => {
  const sortedPosts = useMemo(() => {
    return sort
      ? [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
      : posts;
  }, [posts, sort]);
  return sortedPosts;
};

export const useSortedAndSearchedPosts = (posts, sort, query) => {
  const sortedPosts = useSortedPosts(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query.toLocaleLowerCase())
    );
  }, [sortedPosts, query]);

  return sortedAndSearchedPosts;
};

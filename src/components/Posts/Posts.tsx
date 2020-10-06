import React, { useContext } from "react";
import { Article } from "..";
import { PostsContext } from "../../store/posts/posts-context-provider";

export const Posts: React.FC<{}> = () => {
  const { postsState, postsActions } = useContext(PostsContext);

  const like = (postId: string) => {
    postsActions?.likePost(postId);
  };

  return (
    <div className="posts">
      {postsState.posts.map((article, key) => (
        <Article key={`article_${key}`} data={article} onLike={like} />
      ))}
    </div>
  );
};

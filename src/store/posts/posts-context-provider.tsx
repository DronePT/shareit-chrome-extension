import React from "react";
import { ReducerAction } from "../typings";
import { Post } from "./post";
import { PostsActions, POSTS_NEW, usePostsActions } from "./posts-actions";

declare const chrome: any;

interface PostsState {
  posts: Post[];
  lastPost: Post | null;
}

interface IPostsContext {
  postsState: PostsState;
  postsActions?: PostsActions;
}

const reducer = (state: PostsState, action: ReducerAction) => {
  switch (action.type) {
    case POSTS_NEW:
      return {
        ...state,
        lastPost: action.payload,
        posts: [action.payload, ...state.posts],
      };
    default:
      return state;
  }
};

const initialState: PostsState = {
  posts: [],
  lastPost: null,
};

export const PostsContext = React.createContext<IPostsContext>({
  postsState: initialState,
});

export const PostsProvider: React.FC<{}> = ({ children }) => {
  const [postsState, postsActions] = usePostsActions<PostsState>(
    reducer,
    initialState
  );

  return (
    <PostsContext.Provider value={{ postsState, postsActions }}>
      {children}
    </PostsContext.Provider>
  );
};

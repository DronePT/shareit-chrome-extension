import React from "react";
import { ReducerAction } from "../typings";
import { Post } from "./post";
import {
  PostsActions,
  POSTS_NEW,
  POSTS_POPULATE,
  usePostsActions,
} from "./posts-actions";

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
    case POSTS_POPULATE:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
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

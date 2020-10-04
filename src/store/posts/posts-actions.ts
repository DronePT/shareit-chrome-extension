import { useMemo, useReducer } from "react";
import { ReducerAction } from "../typings";
import { Post } from "./post";

export const POSTS_NEW = "POSTS/NEW";

export interface PostsActions {
  newPost(post: Post): void;
}

export const usePostsActions = <T>(
  reducer: (state: T, action: ReducerAction) => T,
  initialState: any
): [T, PostsActions] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    () => ({
      newPost(post: Post) {
        dispatch({ type: POSTS_NEW, payload: post });
      },
    }),
    []
  );

  return [state, actions];
};

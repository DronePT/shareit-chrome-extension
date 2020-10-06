import { useMemo, useReducer } from "react";
import { ReducerAction } from "../typings";
import { Post } from "./post";
import { sendToBackground } from "../api/send-to-background";

export const POSTS_NEW = "POSTS/NEW";
export const POSTS_SHARE = "POSTS/SHARE";
export const POSTS_POPULATE = "POSTS/POPULATE";

interface SharePostResult {
  success: boolean;
}
export interface PostsActions {
  newPost(post: Post): void;
  populatePosts(posts: Post[]): void;
  sharePost(url: string): Promise<SharePostResult>;
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
      populatePosts(posts: Post[]) {
        dispatch({ type: POSTS_POPULATE, payload: posts });
      },
      async sharePost(url: string) {
        const result = await sendToBackground("share-post", { url });

        return result;
      },
    }),
    []
  );

  return [state, actions];
};

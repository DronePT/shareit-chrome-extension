import { useMemo, useReducer } from "react";
import { ReducerAction } from "../typings";
import { Post } from "./post";
import { sendToBackground } from "../api/send-to-background";

export const POSTS_NEW = "POSTS/NEW";
export const POSTS_SHARE = "POSTS/SHARE";
export const POSTS_POPULATE = "POSTS/POPULATE";
export const POSTS_LIKE = "POSTS/LIKE";

interface SharePostResult {
  success: boolean;
}
export interface PostsActions {
  newPost(post: Post): void;
  newLike(postId: string): void;
  likePost(postId: string): Promise<void>;
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
      newLike(postId: string) {
        dispatch({ type: POSTS_LIKE, payload: postId });
      },
      async likePost(postId: string) {
        await sendToBackground("like-post", { postId });
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

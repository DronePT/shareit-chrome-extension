import { useContext, useEffect } from "react";
import { AuthContext } from "../store/auth/auth-context-provider";
import { PostsContext } from "../store/posts/posts-context-provider";

declare const chrome: any;

export const useChromeRuntime = () => {
  const { postsActions } = useContext(PostsContext);
  const { authActions } = useContext(AuthContext);

  useEffect(() => {
    authActions?.verifyLogin();

    if (chrome?.runtime?.onMessage) {
      chrome.runtime.onMessage.addListener(function (request: any) {
        if (request.action === "new-share") {
          postsActions?.newPost(request.metadata);
        }
      });
    }

    return () => {
      console.warn("useChromeRuntime #unmount");
    };
  }, [authActions, postsActions]);
};

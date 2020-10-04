import { useContext, useEffect } from "react";
import { PostsContext } from "../store/posts/posts-context-provider";

declare const chrome: any;

export const useChromeRuntime = () => {
  const { postsActions } = useContext(PostsContext);

  useEffect(() => {
    console.warn("Yea something is happening!");
    if (chrome?.runtime?.onMessage) {
      chrome.runtime.onMessage.addListener(function (
        request: any,
        sender: any
      ) {
        console.warn("is it, really?!", chrome.runtime.id);
        console.dir(chrome.runtime);

        if (request.action === "new-share") {
          postsActions?.newPost(request.metadata);
        }
        console.warn("wtf, does it work?!");
        console.log("request", request);
        console.log("sender", sender);
      });
    }

    return () => {
      console.warn("useChromeRuntime #unmount");
    };
  }, [postsActions]);
};

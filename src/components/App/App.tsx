import React, { useContext, useEffect } from "react";
import { styles } from "./_App.css";

import { Header, Posts } from "..";

import { PostsContext } from "../../store/posts/posts-context-provider";

declare const chrome: any;
// type ChromeEvent = (request: any, sender: any) => void;
// let mockedFns: ChromeEvent[] = [];

// const chrome = {
//   runtime: {
//     id: "debug",
//     onMessage: {
//       addListener(fn: (request: any, sender: any) => void) {
//         if (mockedFns.length > 3) return;
//         mockedFns.push(fn);
//       },
//     },
//   },
// };

export const App: React.FC<{}> = () => {
  const { postsActions } = useContext(PostsContext);

  // useEffect(() => {
  //   const shareTimer = setInterval(() => {
  //     console.warn("mockedFns.length", mockedFns.length);
  //     mockedFns.forEach((mockFn) =>
  //       mockFn(
  //         {
  //           action: "new-share",
  //           metadata: {
  //             description:
  //               "Redux is a state management solution for web applications. Although it is widely used with React, it...",
  //             image: "https://dev.to/social_previews/article/343520.png",
  //             title: "React Context API + useReducer() = Redux",
  //             url:
  //               "https://dev.to/burhanuday/react-context-api-usereducer-redux-ogo",
  //           },
  //         },
  //         {}
  //       )
  //     );
  //   }, 5000);
  //   return () => {
  //     clearInterval(shareTimer);
  //   };
  // }, []);

  useEffect(() => {
    console.warn("Yea something is happening!");
    if (chrome?.runtime?.onMessage) {
      console.warn("is it, really?!", chrome.runtime.id);
      chrome.runtime.onMessage.addListener(function (
        request: any,
        sender: any
      ) {
        if (request.action === "new-share") {
          postsActions?.newPost(request.metadata);
        }
        console.warn("wtf, does it work?!");
        console.log("request", request);
        console.log("sender", sender);
      });
    }
  }, [postsActions]);

  return (
    <>
      <style>{styles}</style>
      <div id="shareit-extension--container">
        <Header />
        <Posts />
      </div>
    </>
  );
};

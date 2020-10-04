import React, { useState } from "react";
import { styles } from "./_App.css";
import { Header, Article } from "..";

declare const chrome: any;

export const App: React.FC<{}> = () => {
  const [message, setMessage] = useState(false);

  let handleMessage = async () => {
    // everything is "in view"
    chrome.runtime.sendMessage({ message: "click" }, function (response: any) {
      setMessage(response.message);
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div id="shareit-extension--container">
        <Header />
        <div className="articles">
          <Article
            data={{
              title: "React Context API + useReducer() = Redux",
              image: "https://dev.to/social_previews/article/343520.png",
              url:
                "https://dev.to/burhanuday/react-context-api-usereducer-redux-ogo",
              description:
                "Redux is a state management solution for web applications. Although it is widely used with React, it...",
            }}
          />
          <Article
            data={{
              title: "Strict Mode – React",
              image: "https://reactjs.org/logo-og.png",
              url: "https://reactjs.org/docs/strict-mode.html",
              description: "A JavaScript library for building user interfaces",
            }}
          />
          <Article
            data={{
              title: "chrome.runtime - Google Chrome",
              image:
                "https://developer.chrome.com/static/images/chrome-logo_2x.png",
              url:
                "https://developer.chrome.com/extensions/runtime#method-sendMessage",
              description: null,
            }}
          />
          {/* <h1>Extension Shell</h1>
          {message && <p>Random {message}</p>}
          <button onClick={handleMessage}>Click Me</button> */}
        </div>
      </div>
    </>
  );
};

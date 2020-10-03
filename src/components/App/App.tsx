import React, { useState } from "react";
import { styles } from "./_App.css";
import { Header } from "../Header/Header";

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
        <div>
          <h1>Extension Shell</h1>
          {message && <p>Random {message}</p>}
          <button onClick={handleMessage}>Click Me</button>
        </div>
      </div>
    </>
  );
};

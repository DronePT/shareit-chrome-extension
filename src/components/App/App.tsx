import React from "react";
import { styles } from "./_App.css";

import { Header, Posts } from "..";
import { useChromeRuntime } from "../../hooks/use-chrome-runtime";

export const App: React.FC<{}> = () => {
  useChromeRuntime();

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

import React, { useContext } from "react";
import { AuthContext } from "../../store/auth-context-provider";

import { styles } from "./_Header.css";

interface Props {}

export const Header: React.FC<Props> = () => {
  const { authActions, authState } = useContext(AuthContext);

  const login = () => {
    authActions?.login({
      name: "André Alves",
      avatar:
        "https://www.shareicon.net/data/2016/08/05/806962_user_512x512.png",
    });
  };

  return (
    <>
      <style>{styles}</style>
      <div className="shareit-header">
        <h2>
          Share<span>IT</span>
        </h2>
        {authState?.user ? (
          <div className="shareit-header--user">
            <div className="name">
              <span>{authState.user.name}</span>
              <a href="#signout" onClick={authActions?.logout}>
                Signout
              </a>
            </div>
            <div
              className="avatar"
              style={{ backgroundImage: `url(${authState.user.avatar})` }}
            ></div>
          </div>
        ) : (
          <div>
            <button onClick={login}>Signin</button>
          </div>
        )}
      </div>
    </>
  );
};

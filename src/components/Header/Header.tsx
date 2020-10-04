import React, { useContext, useState } from "react";
import { AuthContext } from "../../store/auth/auth-context-provider";
import LoginForm, { LoginData } from "./components/LoginForm";

import { styles } from "./_Header.css";

interface Props {}

export const Header: React.FC<Props> = () => {
  const { authActions, authState } = useContext(AuthContext);
  const [formOpen, setFormOpen] = useState(false);

  const openSignInForm = () => setFormOpen(true);
  const closeSignInForm = () => setFormOpen(false);

  const login = (data: LoginData) => {
    authActions?.login(data);
    closeSignInForm();
  };

  return (
    <>
      <style>{styles}</style>
      <header className="shareit-header">
        <h2>
          Share<span>it</span>
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
          !formOpen && (
            <div>
              <button onClick={openSignInForm}>Signin</button>
            </div>
          )
        )}
      </header>
      {formOpen && <LoginForm onSubmit={login} onCancel={closeSignInForm} />}
    </>
  );
};

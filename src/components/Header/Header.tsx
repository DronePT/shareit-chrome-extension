import React, { useContext, useMemo, useState } from "react";

import { AuthContext } from "../../store/auth/auth-context-provider";
import { PostsContext } from "../../store/posts/posts-context-provider";

import LoginForm, { LoginData } from "./components/LoginForm";
import SharePostForm, { SharePostData } from "./components/SharePostForm";

import { styles } from "./_Header.css";

interface Props {}

export const Header: React.FC<Props> = () => {
  const { authActions, authState } = useContext(AuthContext);
  const { postsActions } = useContext(PostsContext);

  const [formOpen, setFormOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isSharing, setIsSharing] = useState(false);

  const openSignInForm = () => setFormOpen(true);
  const closeSignInForm = () => setFormOpen(false);

  const login = (data: LoginData) => {
    authActions?.login(data);
    closeSignInForm();
  };

  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();

    authActions?.logout();
  };

  const sharePost = async (data: SharePostData) => {
    setIsSharing(true);

    const shared = await postsActions?.sharePost(data.url);

    setIsSharing(false);

    if (shared && shared.success) {
      setUrl("");
    }
  };

  const isLoggedIn = useMemo(() => !!authState.user, [authState.user]);

  return (
    <>
      <style>{styles}</style>
      <header className="shareit-header">
        <h2>
          Share<span>it</span>
        </h2>
        {isLoggedIn ? (
          <div className="shareit-header--user">
            <div className="name">
              <span>{authState.user?.name}</span>
              <a href="#signout" onClick={logout}>
                Signout
              </a>
            </div>
            <div
              className="avatar"
              style={{ backgroundImage: `url(${authState.user?.avatar})` }}
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
      {isLoggedIn && (
        <SharePostForm
          isLoading={isSharing}
          url={url}
          onChange={(url: string) => setUrl(url)}
          onSubmit={sharePost}
        />
      )}
    </>
  );
};

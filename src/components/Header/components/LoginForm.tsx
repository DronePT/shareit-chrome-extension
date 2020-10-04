import React, { useState } from "react";

export interface LoginData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit(loginData: LoginData): void;
  onCancel(): void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onCancel }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="login-form">
      <form action="" method="post" onSubmit={handleFormSubmit}>
        <div className="login-form--field">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="e-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="login-form--field">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-form--field">
          <button type="submit" className="login-form--btn-submit">
            sign in
          </button>
          <button
            type="reset"
            className="login-form--btn-cancel"
            onClick={onCancel}
          >
            cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

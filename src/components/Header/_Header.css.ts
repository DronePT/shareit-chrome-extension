import { boxShadows, colors } from "../../_vars.css";

export const styles = `
.shareit-header {
  padding: 1.2em;

  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${colors.white};
  background-color: ${colors.darkBlue};

  width: 100%;
  height: 80px;
}

.shareit-header h2 {
  margin: 0;
  padding: 0;
  color: inherit;
  font-size: 2em;
  color: ${colors.white};
}

.shareit-header--user {
  display: flex;
  align-items: center;
}

.shareit-header .name {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
}

.shareit-header .name a {
  color: ${colors.primary};
  text-decoration: none;
  font-size: 0.85em;
}

.shareit-header .name a:hover {
  text-decoration: underline;
}

.shareit-header .avatar {
  width: 32px;
  height: 32px;

  margin-left: 1em;

  background-color: #f1f2f3;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}

.shareit-header h2 span {
  color: ${colors.primary};
  font-weight: 700;
}

.login-form {
  width: 100%;
  background-color: ${colors.accent};
  padding: 1em;

  position: relative;

  animation: slideDown;
  animation-duration: 260ms;
  animation-timing-function: ease-in-out;
  animation-fill-mode: forwards;
  animation-iteration-count: 1;
}

.login-form .is-loading {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: ${colors.white50};
  display: flex;
  justify-content: center;
  align-items:center;
}

@keyframes slideDown {
  from {

      opacity: 0;
  }
  to {

      opacity: 1;
  }
}

.login-form--field {
  width: 100%;
  margin-bottom: .5em;
}

.login-form--field input {
  width: 100%;
  padding: .5em;
  border: none;
  outline: none;
  border-radius: 0.25em;
  box-shadow: ${boxShadows.normal}
  color: ${colors.black};
}

.login-form--field:last-child {
  margin-bottom: 0;
}

.login-form--field.login-form--group-field {
  display: flex;
  flex-direction: row;
}

.login-form--field.login-form--group-field button {
  margin-left: 0.5em;
}

.login-form--btn-share {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${colors.primary};
}

.login-form--btn-share i {
  width: 18px;
  margin-right: .5em;
}

.login-form--btn-share i path {
  fill: ${colors.white};
}

.login-form--btn-submit {
  background-color: ${colors.primary};
  font-weight: 700;
}

.login-form--btn-cancel {
  background-color: ${colors.gray};
  color: ${colors.black};
  margin-left: 0.5em;
}
`;

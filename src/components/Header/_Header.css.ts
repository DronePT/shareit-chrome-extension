import { colors } from "../../_vars.css";

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
  border-radius: 50%;
}

.shareit-header h2 span {
  color: ${colors.primary};
  font-weight: 700;
}
`;

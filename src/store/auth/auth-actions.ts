import { useMemo, useReducer } from "react";
import { ReducerAction } from "../typings";

declare const chrome: any;

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

interface LoginData {
  email: string;
  password: string;
}

export interface AuthActions {
  login(user: LoginData): void;
  logout(): void;
}

export const useAuthActions = <T>(
  reducer: (state: T, action: ReducerAction) => T,
  initialState: any
): [T, AuthActions] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    () => ({
      login(user: LoginData) {
        chrome.runtime.sendMessage(
          { action: "login", email: user.email, password: user.password },
          function (user: any) {
            dispatch({ type: AUTH_LOGIN, payload: user });
          }
        );
      },
      logout() {
        dispatch({ type: AUTH_LOGOUT });
      },
    }),
    []
  );

  return [state, actions];
};

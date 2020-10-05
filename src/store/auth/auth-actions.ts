import { useMemo, useReducer } from "react";
import { sendToBackground } from "../api/send-to-background";
import { ReducerAction } from "../typings";

export const AUTH_LOGIN = "AUTH_LOGIN";
export const AUTH_LOGOUT = "AUTH_LOGOUT";

interface LoginData {
  email: string;
  password: string;
}

export interface AuthActions {
  login(user: LoginData): void;
  logout(): void;
  verifyLogin(): void;
}

export const useAuthActions = <T>(
  reducer: (state: T, action: ReducerAction) => T,
  initialState: any
): [T, AuthActions] => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = useMemo(
    () => ({
      async verifyLogin() {
        const result = await sendToBackground("verify-login", {});

        if (result.error) {
          throw new Error(result.error);
        }

        dispatch({ type: AUTH_LOGIN, payload: result });
      },
      async login(user: LoginData) {
        try {
          const { email, password } = user;

          const result = await sendToBackground("login", {
            email,
            password,
          });

          if (result.error) {
            throw new Error(result.error);
          }

          dispatch({ type: AUTH_LOGIN, payload: result });
        } catch (error) {
          console.warn("ERROR ocurred", error);
        }
      },
      async logout() {
        await sendToBackground("logout", {});
        dispatch({ type: AUTH_LOGOUT });
      },
    }),
    []
  );

  return [state, actions];
};

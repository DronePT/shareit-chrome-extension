import React from "react";
import { ReducerAction } from "../typings";
import {
  AuthActions,
  AUTH_LOGIN,
  AUTH_LOGOUT,
  useAuthActions,
} from "./auth-actions";

declare const chrome: any;

interface UserState {
  name: string;
  avatar: string | null;
}

export interface AuthState {
  user: UserState | null;
}

interface IAuthContext {
  authState: AuthState;
  authActions?: AuthActions;
}

const initialState: AuthState = {
  user: null,
};

const reducer = (state: AuthState, action: ReducerAction): AuthState => {
  switch (action.type) {
    case AUTH_LOGIN:
      return { ...state, user: action.payload };
    case AUTH_LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContext = React.createContext<IAuthContext>({
  authState: initialState,
});

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [authState, authActions] = useAuthActions<AuthState>(
    reducer,
    initialState
  );

  return (
    <AuthContext.Provider value={{ authState, authActions }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { useReducer } from "react";

interface UserState {
  name: string;
  avatar: string | null;
}

export interface AuthState {
  user: UserState | null;
}

export interface AuthActions {
  login(user: UserState): void;
  logout(): void;
}

const initialState: AuthState = {
  user: null,
};

interface ReducerAction<P = any> {
  type: string;
  payload?: P;
}

const AUTH_LOGIN = "AUTH_LOGIN";
const AUTH_LOGOUT = "AUTH_LOGOUT";

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

interface IAuthContext {
  authState?: AuthState;
  authActions?: AuthActions;
}

export const AuthContext = React.createContext<IAuthContext>({});

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, initialState);

  const authActions = {
    login(user: UserState) {
      dispatch({ type: AUTH_LOGIN, payload: user });
    },
    logout() {
      dispatch({ type: AUTH_LOGOUT });
    },
  };

  return (
    <AuthContext.Provider value={{ authState, authActions }}>
      {children}
    </AuthContext.Provider>
  );
};

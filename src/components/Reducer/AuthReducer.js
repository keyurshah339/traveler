import { useReducer, createContext, useContext } from "react";
import { setupAuthHeaderForServiceCalls } from "../../utils/funcs";

function AuthHandler(stateAuth, { type, payload }) {
  switch (type) {
    case "CHECK_IF_USER_AUTHENTICATED":
      if (payload.status === true) {
        localStorage.setItem("token", payload.token);
        setupAuthHeaderForServiceCalls(localStorage.getItem("token"));
        return { ...stateAuth, isUserAuthenticated: true };
      } else {
        return { ...stateAuth, isUserAuthenticated: false };
      }

    case "LOGOUT_USER":
      localStorage.clear();
      setupAuthHeaderForServiceCalls(localStorage.getItem("token"));
      return { ...stateAuth, isUserAuthenticated: false };
    default:
      return stateAuth;
  }
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  let isUserAuthenticated;
  if (localStorage.getItem("token")) {
    isUserAuthenticated = true;
  } else {
    isUserAuthenticated = false;
  }

  const initialState = { isUserAuthenticated };
  const [stateAuth, dispatchAuth] = useReducer(AuthHandler, initialState);

  return (
    <AuthContext.Provider value={{ stateAuth, dispatchAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

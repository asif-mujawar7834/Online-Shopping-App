import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

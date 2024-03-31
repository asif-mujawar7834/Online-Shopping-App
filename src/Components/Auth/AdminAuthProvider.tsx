import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
interface AuthProviderProps {
  children: ReactNode;
}

interface UserType {
  user: {
    email: string;
  };
}
export const AdminAuthProvider = ({ children }: AuthProviderProps) => {
  const userString: string | null = localStorage.getItem("user");
  const admin: UserType | null = userString ? JSON.parse(userString) : null;

  if (admin?.user.email === "asif381224@gmail.com") {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

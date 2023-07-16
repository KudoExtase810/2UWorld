import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

type props = {
    children: React.ReactNode;
    method: "redirect" | "hide";
};

const RequireAuth = ({ children, method }: props) => {
    // if method === redirect && user isn't auth then redirect to login
    // if method === hide && user isn't auth then just hide element
    const { userId } = useAuth();
    const isAuth = userId.length > 16;
    if (isAuth) return children;
    if (method === "redirect") return <Navigate to="/login" />;
    else return null;
};
export default RequireAuth;

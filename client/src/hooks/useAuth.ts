import decodeToken from "jwt-decode";
import cookies from "js-cookie";

type Payload = {
    _id: string;
};

const useAuth = () => {
    const token = cookies.get("2uw-token");
    if (!token) return { userId: "" };
    const decoded = decodeToken(token) as Payload;

    return { userId: decoded._id };
};
export default useAuth;

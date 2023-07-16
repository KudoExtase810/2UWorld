import { useState, useContext, useEffect, createContext } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

type CtxProps = {
    children: React.ReactNode;
};

type UserContext = {
    data: User | undefined;
    setData: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = createContext({} as UserContext);

export const useUserData = () => useContext(UserContext);

const UserContextProvider = ({ children }: CtxProps) => {
    const [data, setData] = useState<User>();
    const { userId } = useAuth();

    useEffect(() => {
        const getUserData = async () => {
            const url = `${import.meta.env.VITE_API_URL}/users/${userId}`;
            const response = await axios.get(url);
            setData(response.data as User);
        };
        if (userId && !data) getUserData();
    }, []);

    return (
        <UserContext.Provider value={{ data, setData }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;

import { useEffect, createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/authService"
import { LoadingContext } from "./loading.context";

interface AuthContextProps {
    authenticateUser: () => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const { render, setIsLoading, user, setUser } = useContext(LoadingContext)

    const navigate = useNavigate();

    const authenticateUser = () => {

        const token = localStorage.getItem("authToken");
        
        setIsLoading(true);
     
        if (token) {
            get("/auth/verify")
                .then((results) => {
                    console.log("Are we logged in?", results.data);
                    setUser(results.data)

                })
                .catch((err) => {
                    localStorage.clear();
                    setIsLoading(false)
                    console.log(err.message);
                })
                .finally(() => {
                    setIsLoading(false)
                });
            } else {
                localStorage.clear()
                setIsLoading(false);
                setUser(null);
            }

            console.log("This is the user", user)
    }

    const logout = () => {
        localStorage.clear();
        console.log("we've logged out")
        setUser(null);
        navigate("/");
      };


    useEffect(() => {
        authenticateUser();
      }, [render]);


    return (
        <AuthContext.Provider value={{ authenticateUser, logout }}>
          {children}
        </AuthContext.Provider>
      );
}

export { AuthContext, AuthProvider }
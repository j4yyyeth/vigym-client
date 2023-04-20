import { useState, createContext } from "react";
import { get, post } from "../services/authService";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [render, setRender] = useState(false);

    return (
        <LoadingContext.Provider value={{render, setRender, user, setUser, isLoading, setIsLoading}}>
          {children}
        </LoadingContext.Provider>
      );
}

export { LoadingContext, LoadingProvider }
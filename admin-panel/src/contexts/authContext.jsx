import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {

    const backendUrl = 'http://localhost:3030'
    
   const [authState, setAuthState] = useState({
    accessToken:null,
    refreshToken:null
   });

   const setTokens = (tokens) => {
    setAuthState(tokens);
   }

   const clearTokens = () => {
    setAuthState({
        accessToken:null,
        refreshToken:null
       })
   }


    return(
        <AuthContext.Provider value = {{
            authState, setTokens, clearTokens, backendUrl
        }}>
            {children}
        </AuthContext.Provider>
    )
};



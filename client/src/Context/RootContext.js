import React, { createContext, useState, useEffect } from 'react'
export const RootContext = createContext();

export const ContextProvider = ({ children }) => {
    const prevAuth = window.sessionStorage.getItem('authenticated') || false;
    const prevAuthBody = window.sessionStorage.getItem('authBody') || null;
    const [authenticated, setAuthenticated] = useState(prevAuth);
    const [authBody, setAuthBody] = useState(prevAuthBody);

    useEffect(
        () => {
            window.sessionStorage.setItem('authenticated', authenticated);
            window.sessionStorage.setItem('authBody', authBody);
        },
        [authenticated, authBody]
    );

    const defaultContext = {
        authenticated,
        setAuthenticated,
        authBody,
        setAuthBody
    };

    return (
        <RootContext.Provider value={defaultContext}>
            {children}
        </RootContext.Provider>
    );
};

export default ContextProvider;

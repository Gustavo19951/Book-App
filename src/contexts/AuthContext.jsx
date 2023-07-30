import React, {useState} from "react";

const authContext = React.createContext(null);
const AuthProvider = ({children}) => {

    const authDataLocalStorage = localStorage.getItem('pocketbase_auth');
    let authDataLS = authDataLocalStorage ? JSON.parse(authDataLocalStorage) : undefined;

    const [authData, setAuthData] = useState(authDataLS);
    const [loadDrawerLogin, setLoadDrawerLogin] = useState(false);
    const setAuthDataContext = (authData) => {

        if (!authData) {
            setAuthData(authData);
            return;
        }
        setAuthData(JSON.parse(localStorage.getItem('pocketbase_auth')))

    }
    const getAuthDataContext = () => authData

    const setLoadDrawerLoginContext = (load) => setLoadDrawerLogin(load);
    const getLoadDrawerLoginContext = () => loadDrawerLogin

    return (
        <authContext.Provider
            value={{setAuthDataContext, getAuthDataContext, setLoadDrawerLoginContext, getLoadDrawerLoginContext}}>
            {children}
        </authContext.Provider>
    )

}
export {AuthProvider, authContext};
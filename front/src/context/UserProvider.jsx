import { useState } from "react";
import { UserContext } from "./UserContext";
import { login } from "../services/users.service";
import { useLocation, useNavigate } from "react-router-dom";

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({});

    const handleLogin = ( email, password ) => {
        login( email, password )
            .then( async(response) => {
                if( response.status === 200 ) {
                    console.log('LOGIN SUCCESSFUL', response.data);
                    localStorage.setItem('token', response.data.token);
                    setUser( response.data );
                    
                    const origin = location.state?.from?.pathname || '/';
                    navigate( origin );
                }else{
                    console.log('LOGIN FAILED', response);
                }
            });
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser({});
        navigate('/');
    }

    return (
        <UserContext.Provider value={ { handleLogin, handleLogout, user } }>
            { children }
        </UserContext.Provider>
    )
};
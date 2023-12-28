import { useState } from "react";
import { UserContext } from "./UserContext";
import { UserService } from "../services/";
import { useLocation, useNavigate } from "react-router-dom";

const userService = new UserService();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState({});

    const handleLogin = ( email, password ) => {
        return new Promise( ( resolve ,reject ) => {
            userService.login( email, password )
                .then( async(response) => {
                    if( response.status === 200 ) {
                        console.log('LOGIN SUCCESSFUL', response.data);
                        localStorage.setItem('token', response.data.token);
                        setUser( response.data );
                        
                        const origin = location.state?.from?.pathname || '/';
                        navigate( origin );
                        resolve( response.data );
                    }else{
                        console.log('LOGIN FAILED', response);
                    }
                })
                .catch( err => { 
                    reject( err.response );
                } );
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
import { useEffect, useState } from "react";
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
                        // console.log('LOGIN SUCCESSFUL', response.data);
                        const user = response.data;
                        localStorage.setItem('user', JSON.stringify(user));
                        setUser( response.data );
                        
                        const origin = location.state?.from?.pathname || '/';
                        navigate( origin );
                        resolve( response.data );
                    }else{
                        console.log('LOGIN FAILED', response);
                    }
                })
                .catch( err => { 
                    console.log( err );
                    reject( err.response );
                } );
        });
    }

    const updateGlobalUser = () => {
        if( !user ) return console.log('no user logged');

        userService.get( user.rut )
            .then( response => {
                setUser( response.data );
                console.log('[USERPROVIDER UPDATEUSER] user updated successfully');
            })
            .catch( err => {
                console.log('[USERPROVIDER UPDATEUSER] ERROR ', err);
            })
    }

    const isLogged = () => {
        // console.log9('USERPROVIDER ISLOGGED', user? true : false);
        return user ? true : false;
    }

    const handleLogout = () => {
        localStorage.clear()
        setUser({});
        navigate('/');
    }

    useEffect(() => {
        const user = localStorage.getItem('user');
        if( user ) {
            setUser( JSON.parse(user) );
            // console.log(JSON.parse(user));
        }
    },[]);

    return (
        <UserContext.Provider value={ { handleLogin, handleLogout, user, isLogged, updateGlobalUser } }>
            { children }
        </UserContext.Provider>
    )
};
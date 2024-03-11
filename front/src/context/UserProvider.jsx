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
                        console.log('LOGIN SUCCESSFUL', response.data);
                        localStorage.setItem('token', response.data.token);
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

    //TODO RENAME THIS TO USE IT IN USER SETTINGS
    const updateUser = () => {
        if( !user ) return console.log('no user logged');

        userService.get( user.id )
            .then( response => {
                setUser( response.data );
                console.log('[USERPROVIDER UPDATEUSER] user updated successfully');
            })
            .catch( err => {
                console.log('[USERPROVIDER UPDATEUSER] ERROR ', err);
            })
    }

    useEffect(() => {
        if( isLogged() ) {
            const localStorageUser = JSON.parse( localStorage.getItem( user ) );
            console.log('localstorageuser', localStorageUser );
            setUser( localStorageUser );
        }else{
            navigate('/login');
        }
    }, []);

    const isLogged = () => {
        const token = localStorage.getItem('token');
        console.log('isLogged', token ? true : false);
        // if( token ) {
        //     userService.getMe( token )
        //         .then( response => {
        //             if( response.status === 200 ) {
        //                 setUser( response.data );
        //             }
        //         })
        //         .catch( err => {
        //             console.log('ERROR', err);
        //         });
        // }
        return token ? true : false; 
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser({});
        navigate('/');
    }

    return (
        <UserContext.Provider value={ { handleLogin, handleLogout, user, isLogged, updateUser } }>
            { children }
        </UserContext.Provider>
    )
};
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ children }) => {

    const location = useLocation();
    const { isLogged } = useContext( UserContext );

    if( !isLogged ) {
        return <Navigate to='/login' replace state={{ from: location }}/>
    }

    // if( localStorage.getItem('token') === null ) {
    //     return <Navigate to='/login' replace state={{ from: location }}/>
    // }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};
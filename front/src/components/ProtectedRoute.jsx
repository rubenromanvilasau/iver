import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import PropTypes from 'prop-types'

export const ProtectedRoute = ({ children }) => {

    const location = useLocation();
    const { user } = useContext( UserContext );

    if( !user.token ) {
        return <Navigate to='/login' replace state={{ from: location }}/>
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired
};
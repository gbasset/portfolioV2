import React, { useContext } from 'react';

import { Route, Navigate } from "react-router-dom";
import { RootContext } from '../Context/RootContext';
const ProtectedRoute = ({ component: Component, mustBeAdmin, ...rest }) => {
    const {
        authenticated,
        authBody
    } = useContext(RootContext)

    return (
        <Route render={
            props => {
                if (mustBeAdmin) {
                    if (authenticated === true && authBody.body.isAdmin) {
                        return <Component {...rest} {...props} />
                    } else {
                        return <Navigate to={
                            {
                                pathname: '/profile',
                                state: {
                                    from: props.location
                                }
                            }
                        } />
                    }
                }
                else if (authenticated === true) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Navigate to={
                        {
                            pathname: '/login',
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        } />)

};
export default ProtectedRoute;
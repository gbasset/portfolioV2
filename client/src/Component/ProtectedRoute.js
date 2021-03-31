import React, { useContext } from 'react';

import { Route, Redirect } from "react-router-dom";
import { RootContext } from '../Context/RootContext';
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const {
        authenticated
    } = useContext(RootContext)
    console.log("authenticated", authenticated);
    const condition = true
    console.log("condition", condition);
    return (
        <Route render={
            props => {
                if (authenticated === true) {
                    return <Component {...rest} {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: '/home',
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
import React from 'react';
import { Route, Redirect } from "react-router-dom";



import { useCookies } from 'react-cookie';

const GuardedRoute = ({ component: Component, auth, ...rest }) => {

const [cookies] = useCookies(['token']);

return(
    <Route {...rest} render={(props) => (
          cookies.Token
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)
}

export default GuardedRoute;

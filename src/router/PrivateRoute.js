import { REQUEST_STATE } from 'configs';
import { apiCurrentUser, apiGetUserProfile } from 'data-source/users';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { LOGIN_SUCCESS, logout } from 'redux/users/action';

function PrivateRoute({ component: Component, location, ...rest }) {
    const [isAuth, setIsAuth] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const accessToken = Cookies.get('token');
            console.debug('accessToken: ', accessToken);
            if (accessToken) {
                const curentUser = await apiCurrentUser();
                const profileUser = await apiGetUserProfile();
                if (curentUser.state === REQUEST_STATE.SUCCESS) {
                    dispatch(LOGIN_SUCCESS({...profileUser.data, ...curentUser.data }));
                    setIsAuth(1);
                } else if (curentUser.state === REQUEST_STATE.ERROR) {
                    dispatch(logout());
                    setIsAuth(2);
                }
            } else {
                setIsAuth(2);
            }
        })();
    }, [dispatch]);
    switch (isAuth) {
        case 0:
            return <div></div>;
        case 1:
            return <Route {...rest} render={(props) => <Component {...props} />} />;
        default:
            return <Redirect to={{ pathname: '/auth/login', state: { from: location } }} />;
    }
}

export default PrivateRoute;

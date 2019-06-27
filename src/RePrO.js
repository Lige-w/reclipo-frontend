import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from "react-redux";

import './App.css';

import {token} from './helpers/fetch'
import {requestAuth} from "./redux/actions/userActions";

import RegisterContainer from './containers/RegisterContainer'
import LoginContainer from './containers/LoginContainer'
import UserProfile from './containers/UserProfile'
import NotFound from './components/NotFound'

const RePrO = ({user, requestAuth}) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (token()) {
            requestAuth(setIsLoading)
        } else {
            setIsLoading(false)
        }
    }, [])


    const redirectHome = () => (
        isLoading ? null : (
            user ? <Redirect to={`/${user.username}`} /> : <Redirect to='/login' />
        )
    )

    const showLogin = () => (
        isLoading ? null : (
            user ? <Redirect to={`/${user.username}`} /> :
                <LoginContainer />
        )
    )

    const showRegister = () => (
        isLoading ? null : (
            user ? <Redirect to={`/${user.username}`} /> :
                <RegisterContainer />
        )
    )

    const showProfile = () => isLoading ? null : (
        user ? <UserProfile/> : <Redirect to="/login" />
    )

    return (
        <div className="repro">
            <Switch>
                <div className={`home-background${user? '' : ' login'}`}>
                    <Route exact path='/' render={redirectHome} />
                    <Route exact path='/login' render={showLogin} />
                    <Route exact path='/register' render={showRegister} />
                {user ? <Route exact path={`/${user.username}`} render={showProfile}/> : null}
                </div>
            </Switch>
        </div>
    );
}

export default withRouter(connect(state => ({ user: state.user }), {requestAuth})(RePrO));

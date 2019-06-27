import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from "react-redux";

import './App.css';

import {token, authFetch} from './helpers/fetch'

import RegisterContainer from './containers/RegisterContainer'
import LoginContainer from './containers/LoginContainer'
import UserProfile from './containers/UserProfile'

const RePrO = ({user}) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (token()) {
            authFetch().then(user => {
                console.log(user)
                setIsLoading(false)
            })
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
    return (
        <div className="repro">
            <Switch>
                <div className={`home-background${user? '' : ' login'}`}>
                    <Route exact path='/' render={redirectHome} />
                    <Route exact path='/login' render={showLogin} />
                    <Route exact path='/register' render={showRegister} />
                {user ? <Route exact path={`/${user.username}`} component={UserProfile}/> : null}
                </div>
            </Switch>
        </div>
    );
}

export default connect(state => ({ user: state.user }))(RePrO);

import React, {useEffect, useState} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from "react-redux";

import RegisterContainer from './containers/RegisterContainer'
import LoginContainer from './containers/LoginContainer'
import './App.css';

const RePrO = ({user}) => {

    const [isLoading, setIsLoading] = useState(false)


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
            <div className='home-background'>
                <Route exact path='/' render={redirectHome} />
                <Route exact path='/login' render={showLogin} />
                <Route exact path='/register' render={showRegister} />
            </div>
        </div>
    );
}

export default connect(state => ({ user: state.user }))(RePrO);

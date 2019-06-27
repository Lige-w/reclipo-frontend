import React from 'react'


import LoginForm from '../components/LoginForm'
import '../styles/login.css'
import {Link} from "react-router-dom";

const LoginContainer = () => {
    return (
        <div id='login-container' className='float-right'>
            <h1 className="site-title">RePrO</h1>
            <LoginForm/>
            <Link to='/password_reset'>Forgot Password?</Link>
            <Link className='float-right' to='/register'>Dont have an account yet? Register</Link>
        </div>
    )
}

export default LoginContainer
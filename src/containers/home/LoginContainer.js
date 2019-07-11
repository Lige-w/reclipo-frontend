import React from 'react'


import LoginForm from '../../components/home/LoginForm'
import '../../styles/login.css'
import {Link} from "react-router-dom";
import logo from '../../assets/books-stack-of-three-black.svg'

const LoginContainer = () => {
    return (
        <div id='login-container' className='float-right'>
            <div className="logo">
                <img src={logo} alt=""/>
                <h1 className="site-title">RePrO</h1>
            </div>
            <LoginForm/>
            <Link to='/password_reset'>Forgot Password?</Link>
            <Link className='float-right' to='/register'>Dont have an account yet? Register</Link>
        </div>
    )
}

export default LoginContainer
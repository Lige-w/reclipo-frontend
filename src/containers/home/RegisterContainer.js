import React from 'react'

import RegisterForm from '../../components/home/RegisterForm'
import {Link} from "react-router-dom";
import logo from "../../assets/books-stack-of-three-black.svg";

const RegisterContainer = () => {
    return (
        <div id="register-container">
            <div className="logo">
                <img src={logo} alt=""/>
                <h1 className="site-title">RePrO</h1>
            </div>
            <RegisterForm/>
            <Link className='float-right' to='/login'>Already signed up? Log In</Link>
        </div>
    )
}

export default RegisterContainer
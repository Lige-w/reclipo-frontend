import React, {useState} from 'react'

import RegisterForm from '../components/RegisterForm'
import {Link} from "react-router-dom";

const RegisterContainer = () => {
    return (
        <div id="register-container">
            <h1 className="site-title">RePrO</h1>
            <RegisterForm/>
            <Link className='float-right' to='/login'>Already signed up? Log In</Link>
        </div>
    )
}

export default RegisterContainer
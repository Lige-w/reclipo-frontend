import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {requestLogin} from "../../redux/actions/userActions";

const LoginForm = ({requestLogin}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        requestLogin({user: {username, password}})
    }

    return (
        <div id='login-form-container'>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input onChange={e => setUsername(e.target.value)} type="text" placeholder='Username'/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="password" placeholder='Password'/>
                </Form.Field>
                <Button className='full-width-button' type='submit'>Log In</Button>
            </Form>
        </div>
    )
}

export default connect(null, {requestLogin})(LoginForm)
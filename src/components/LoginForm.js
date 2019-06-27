import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div id='login-form-container'>
            <Form>
                <Form.Field>
                    <label>Username</label>
                    <input onChange={e => setUsername(e.target.value)} type="text" placeholder='Username'/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input onChange={e => setPassword(e.target.value)} type="text" placeholder='Password'/>
                </Form.Field>
                <Button className='full-width-button' type='submit'>Log In</Button>
            </Form>
        </div>
    )
}

export default connect()(LoginForm)
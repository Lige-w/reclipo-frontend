import React, {useState} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {connect} from "react-redux";
import {registerUser} from "../../redux/actions/userActions";

const RegisterForm = ({registerUser}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = () => {
        if (password === confirmPassword) {
            registerUser({user: {username, email, password}})
        }
    }

    return (
        <div id='login-form-container'>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>Username</label>
                    <input
                        onChange={(e)=>{setUsername(e.target.value)}}
                        value={username}
                        type="text"
                        placeholder='Username'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Email Address</label>
                    <input
                        onChange={(e)=>{setEmail(e.target.value)}}
                        value={email}
                        type="email"
                        placeholder='Email Address'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input
                        onChange={(e)=>{setPassword(e.target.value)}}
                        value={password}
                        type="password"
                        placeholder='Password'
                    />
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <input
                        onChange={(e)=>{setConfirmPassword(e.target.value)}}
                        value={confirmPassword}
                        type="password"
                        placeholder='Confirm Password'
                    />
                </Form.Field>
                <Button className='full-width-button' type='submit'>Register</Button>
            </Form>
        </div>
    )
}


export default connect(null, {registerUser})(RegisterForm)
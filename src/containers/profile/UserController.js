import React from 'react'
import {Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'
import {logout} from "../../redux/actions/userActions";

const UserController = ({logout}) => {
    const handleLogout = () => {
        logout()
        return <Redirect to='/' />
    }

    return (
        <div id="user-controller">
            <div id='logout' onClick={handleLogout}><Icon name='sign out'/> <strong>Log Out</strong></div>
        </div>
    )
}

export default connect(null, {logout})(UserController)
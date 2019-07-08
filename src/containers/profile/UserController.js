import React from 'react'
import {Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {Redirect, Link, withRouter} from 'react-router-dom'
import {logout} from "../../redux/actions/userActions";

const UserController = ({logout, match}) => {
    const handleLogout = () => {
        logout()
        return <Redirect to='/' />
    }

    return (
        <div id="user-controller">
            <Link to={match.path}><Icon name='home'/> Home</Link>
            <div id='logout' onClick={handleLogout}><Icon name='sign out'/> <strong>Log Out</strong></div>
        </div>
    )
}

export default withRouter(connect(null, {logout})(UserController))
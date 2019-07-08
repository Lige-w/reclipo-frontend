import React from 'react'
import {Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {Redirect, Link, withRouter} from 'react-router-dom'
import {logout} from "../../redux/actions/userActions";
import {setCurrentProject} from "../../redux/actions/projectActions";

const UserController = ({logout, match, setCurrentProject}) => {
    const handleLogout = () => {
        logout()
        return <Redirect to='/' />
    }

    return (
        <div id="user-controller">
            <Link onClick={() => setCurrentProject(null)} to={match.path}>
                <Icon name='home'/> <strong>Home</strong>
            </Link>
            <div className='controller-link' id='logout' onClick={handleLogout}>
                <Icon name='sign out'/> <strong>Log Out</strong>
            </div>
        </div>
    )
}

export default withRouter(connect(null, {logout, setCurrentProject})(UserController))
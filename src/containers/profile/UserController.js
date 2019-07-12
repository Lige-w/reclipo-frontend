import React from 'react'
import {Icon, Menu} from "semantic-ui-react";
import {connect} from "react-redux";
import {Redirect, Link, withRouter} from 'react-router-dom'
import {logout} from "../../redux/actions/userActions";
import {setCurrentProject} from "../../redux/actions/projectActions";
import NewProject from "../../components/profile/NewProject";

const UserController = ({logout, match, setCurrentProject}) => {
    const handleLogout = () => {
        logout()
        setCurrentProject(null)
        return <Redirect to='/' />
    }

    return (
        <Menu vertical id="user-controller">
            <Menu.Item>
                <div >
                    <Link className='controller-link' onClick={() => setCurrentProject(null)} to={match.path}>
                        <Icon name='home'/> <strong>Home</strong>
                    </Link>
                </div>
            </Menu.Item>
            <Menu.Item>
                <NewProject/>
            </Menu.Item>
            <Menu.Item>
                <div className='controller-link' id='logout' onClick={handleLogout}>
                    <Icon name='sign out'/> <strong>Log Out</strong>
                </div>
            </Menu.Item>
        </Menu>
    )
}

export default withRouter(connect(null, {logout, setCurrentProject})(UserController))
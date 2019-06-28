import React from 'react'
import {connect} from "react-redux";


import ProjectsController from './ProjectsController'
import ResourcesContainer from './ResourcesContainer'
import UserController from './UserController'

import '../../styles/profile.css'

const UserProfile = ({user}) => {
    return (
        <div id='user-profile'>
            <ResourcesContainer/>
            <ProjectsController/>
            <UserController/>
        </div>
    )
}

export default connect(state => ({user: state.user}))(UserProfile)
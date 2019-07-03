import React from 'react'
import {connect} from "react-redux";


import ProjectsController from './ProjectsController'
import ReferencesContainer from './reference-container/ReferencesContainer'
import UserController from './UserController'

import '../../styles/profile.css'

const UserProfile = () => {

    return (
        <div id='user-profile'>
            <ProjectsController/>
            <ReferencesContainer/>
            <UserController/>
        </div>
    )
}

export default UserProfile
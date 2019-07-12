import React from 'react'

import ProjectsController from './ProjectsController'
import ReferencesContainer from './reference-container/ReferencesContainer'
import UserController from './UserController'

import '../../styles/profile.css'

const UserProfile = () => {

    return (
        <div id='user-profile'>
            <div id='controllers'>
            <ProjectsController/>
            <UserController/>
            </div>
            <ReferencesContainer/>
        </div>
    )
}

export default UserProfile
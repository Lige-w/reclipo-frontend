import React from 'react'
import {connect} from "react-redux";


import ProjectsController from './ProjectsController'
import ReferencesContainer from './reference-container/ReferencesContainer'
import UserController from './UserController'

import '../../styles/profile.css'

const UserProfile = ({user}) => {
    return (
        <div id='user-profile'>
            <ReferencesContainer/>
            <ProjectsController/>
            <UserController/>
        </div>
    )
}

export default connect(state => ({user: state.user}))(UserProfile)
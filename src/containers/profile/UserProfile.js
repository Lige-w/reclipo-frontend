import React from 'react'
import {connect} from "react-redux";


import ProjectsController from './ProjectsController'
import ReferencesContainer from './reference-container/ReferencesContainer'
import UserController from './UserController'

import '../../styles/profile.css'

const UserProfile = ({currentProject}) => {
    return (
        <div id='user-profile'>
            <ProjectsController/>
            {currentProject ?
                <ReferencesContainer/> :
                <div id='resourcesContainer'>Please select a project</div>
            }
            <UserController/>
        </div>
    )
}

export default connect(state => ({currentProject: state.currentProject}))(UserProfile)
import React from 'react'
import {connect} from "react-redux";


import ProjectsController from './ProjectsController'
import ResourcesContainer from './ResourcesContainer'

import '../../styles/profile.css'

const UserProfile = ({user}) => {
    return (
        <div id='user-profile'>
            <ProjectsController/>
            <ResourcesContainer/>
        </div>
    )
}

export default connect(state => ({user: state.user}))(UserProfile)
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Menu} from "semantic-ui-react";

import {requestUserProjects} from "../../redux/actions/projectActions";

import OpenProject from '../../components/profile/OpenProject'

const ProjectsController = ({projects, requestUserProjects}) => {

    useEffect(() => {requestUserProjects()},[])

    const openProjectComponents = projects.map(project => <OpenProject key={project.id} project={project} />)

    return (
        <Menu vertical id="projects-controller">
            {openProjectComponents}
        </Menu>
    )
}

export default connect(state => ({projects: state.projects}), {requestUserProjects})(ProjectsController)
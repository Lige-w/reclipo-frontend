import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Route, Link} from "react-router-dom";

import {requestUserProjects} from "../../redux/actions/projectActions";

import NewProject from '../../components/profile/NewProject'
import OpenProject from '../../components/profile/OpenProject'

const ProjectsController = ({projects, requestUserProjects}) => {

    useEffect(() => {requestUserProjects()},[])

    const openProjectComponents = projects.map(project => <OpenProject key={project.id} project={project} />)

    return (
        <div id="projects-controller">
            <NewProject/>
            {openProjectComponents}
        </div>
    )
}

export default connect(state => ({projects: state.projects}), {requestUserProjects})(ProjectsController)
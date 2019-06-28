import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Route, Link} from "react-router-dom";

import {requestUserProjects} from "../../redux/actions/projectActions";
import NewProject from '../../components/profile/NewProject'

const ProjectsController = ({projects, requestUserProjects}) => {

    useEffect(requestUserProjects,[])

    console.log(projects)

    return (
        <div id="projects-controller">
            <NewProject/>
        </div>
    )
}

export default connect(state => ({projects: state.projects}), {requestUserProjects})(ProjectsController)
import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {Menu} from "semantic-ui-react";

import {requestUserProjects} from "../../redux/actions/projectActions";

import OpenProject from '../../components/profile/OpenProject'
import logo from "../../assets/books-stack-of-three-light-grey.svg";

const ProjectsController = ({projects, requestUserProjects}) => {

    useEffect(() => {requestUserProjects()},[])

    const openProjectComponents = projects.map(project => <OpenProject key={project.id} project={project} />)

    return (
        <Menu vertical id="projects-controller">
            <Menu.Item position='bottom' id='logo'>
                <img  src={logo} />
                <h1 className="logo-title">RePrO</h1>
            </Menu.Item>
            {openProjectComponents}
        </Menu>
    )
}

export default connect(state => ({projects: state.projects}), {requestUserProjects})(ProjectsController)
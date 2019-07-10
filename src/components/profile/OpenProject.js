import React from 'react'
import {connect} from "react-redux";
import {Icon, Menu} from "semantic-ui-react";
import {Link} from "react-router-dom";

import DeleteProjectModal from './DeleteProjectModal'

const OpenProject =  ({project: {id, title, description}, username, currentProject}) => {

    return (
        <Menu.Item className='projects controller-link'>
            <div>
            <Link to={`/${username}/${id}_${title.toLowerCase().replace(/\s/g, '_')}`}>
                <Icon name={`${currentProject ? currentProject.id === id? 'open': null : null} folder`}/>
                <strong> {title}</strong>
            </Link>

            </div>
        </Menu.Item>
    )
}

export default connect(state => ({username: state.user.username, currentProject: state.currentProject}))(OpenProject)
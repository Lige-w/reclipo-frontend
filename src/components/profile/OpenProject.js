import React, {useState} from 'react'
import {connect} from "react-redux";
import {Icon, Menu, Popup} from "semantic-ui-react";
import {Link} from "react-router-dom";

import DeleteProjectModal from './DeleteProjectModal'

const OpenProject =  ({project: {id, title, description}, username, currentProject}) => {




    return (
        <Menu.Item className='projects controller-link'>
            <Popup trigger={
                <Link to={`/${username}/${id}_${title.toLowerCase().replace(/\s/g, '_')}`}>
                    <Icon name={`${currentProject ? currentProject.id === id ? 'open ' : '' : ''}folder`}/>
                    <strong> {title}</strong>
                </Link>
            }
                   inverted
                   position='right center'
                   content={description}
            />
        </Menu.Item>
    )
}

export default connect(state => ({username: state.user.username, currentProject: state.currentProject}))(OpenProject)
import React from 'react'
import {connect} from "react-redux";
import {Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

import DeleteProjectModal from './DeleteProjectModal'

const OpenProject =  ({project: {id, title, description}, username}) => {
    return (
        <div className='controller-link'>
            <Link to={`/${username}/${id}_${title.toLowerCase().replace(/\s/g, '_')}`}>
                <Icon name='folder'/>
                <strong> {title}</strong>
            </Link>
            <DeleteProjectModal title={title} id={id}/>
        </div>
    )
}

export default connect(state => ({username: state.user.username}))(OpenProject)
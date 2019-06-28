import React from 'react'
import {connect} from "react-redux";
import {Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";

const OpenProject =  ({project: {id, title, description}, username}) => {
    return (
        <div>
            <Link to={`/${username}/${id}_${title.toLowerCase().replace(/\s/g, '_')}`}>
                <Icon name='folder'/>
                <strong> {title}</strong>
            </Link>
        </div>
    )
}

export default connect(state => ({username: state.user.username}))(OpenProject)
import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {requestProjectDetails} from "../../../redux/actions/projectActions";

const ProjectResources = ({match, requestProjectDetails}) => {
    const id = match.params.id.split('_')[0]

    useEffect(() => {requestProjectDetails(id)}, [])

    return (
        <div className='resources'>{id}</div>
    )
}

export default connect(null, {requestProjectDetails})(ProjectResources)
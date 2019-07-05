import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {requestProjectDetails} from "../../../redux/actions/projectActions";

import Reference from "../../../components/profile/reference-container/Reference"

const ProjectReferences = ({match, requestProjectDetails, references}) => {
    const id = match.params.id.split('_')[0]

    useEffect(() => {requestProjectDetails(id)}, [match])

    const referenceComponents = references.map(reference => (
        <Reference key={reference.id} reference={reference} />
    ))

    return (
        <div className='resources'>
            {referenceComponents}
        </div>
    )
}

export default connect(
    state => ({currentProject: state.currentProject, references: state.references}),
    {requestProjectDetails}
    )(ProjectReferences)
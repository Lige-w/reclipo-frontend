import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {requestProjectDetails} from "../../../redux/actions/projectActions";

import Reference from "../../../components/profile/reference-container/Reference"

const ProjectReferences = ({match, requestProjectDetails, currentProject}) => {
    const id = match.params.id.split('_')[0]

    const [references, setReferences] = useState([])

    useEffect(() => {requestProjectDetails(id)}, [])
    useEffect(() => {
       if(!!currentProject) {setReferences(currentProject.references)}
    }, [currentProject])

    const referenceComponents = references.map(reference => (
        <Reference key={reference.id} reference={reference} />
    ))
    return (
        <div className='resources'>
            {referenceComponents}
        </div>
    )
}

export default connect(state => ({currentProject: state.currentProject}), {requestProjectDetails})(ProjectReferences)
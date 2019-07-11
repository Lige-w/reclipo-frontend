import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {requestProjectDetails} from "../../../redux/actions/projectActions";
import {setIsShowingRefForm} from "../../../redux/actions/referenceActions";

import Reference from "../../../components/profile/reference-container/Reference"

const ProjectReferences = ({match, requestProjectDetails, references, filterTags, setIsShowingRefForm}) => {
    const id = match.params.id.split('_')[0]

    useEffect(() => {
        requestProjectDetails(id)
    }, [match])

    const referenceComponents = references.filter(reference => {
        return filterTags.every(tag => reference.tags.find(t => {
            return t.id === tag
        }))
    })
        .map(reference => (
        <Reference key={reference.id} reference={reference} />
    ))

    return (
        <div className='resources'>
            {referenceComponents}
        </div>
    )
}

export default connect(
    state => ({
        references: state.references,
        filterTags: state.filterTags
    }),
    {
        requestProjectDetails,
        setIsShowingRefForm
    }
    )(ProjectReferences)
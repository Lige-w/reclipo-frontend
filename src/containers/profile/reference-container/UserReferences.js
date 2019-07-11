import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {requestGetUserReferences} from "../../../redux/actions/referenceActions";
import Reference from "../../../components/profile/reference-container/Reference"

const UserReferences = ({references, requestGetUserReferences, filterTags}) => {

    useEffect(() => {
        requestGetUserReferences(filterTags)
    }, [filterTags])



    const referenceComponents = references.map(reference => (
        <Reference key={reference.id} reference={reference} />
    ))

    return (
        <div className='resources'>

            {referenceComponents}
        </div>
    )
}

export default connect(state => ({
    references: state.references, filterTags: state.filterTags
}), {requestGetUserReferences})(UserReferences)
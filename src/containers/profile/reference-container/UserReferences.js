import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {requestGetUserReferences} from "../../../redux/actions/referenceActions";
import Reference from "../../../components/profile/reference-container/Reference"

const UserReferences = ({userReferences, requestGetUserReferences}) => {

    useEffect(() => {
        requestGetUserReferences()
    }, [])

    const referenceComponents = userReferences.map(reference => (
        <Reference key={reference.id} reference={reference} />
    ))

    return (
        <div className='resources'>
            {referenceComponents}
        </div>
    )
}

export default connect(state => ({userReferences: state.userReferences}), {requestGetUserReferences})(UserReferences)
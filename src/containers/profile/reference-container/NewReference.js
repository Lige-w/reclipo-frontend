import React from 'react'
import ReferenceForm from '../../../components/profile/reference-container/ReferenceForm'


const NewReference = ({setIsShowingRefForm}) => {
    return (
        <div className="new-reference">
            <ReferenceForm setIsShowingRefForm={setIsShowingRefForm}/>
        </div>
    )
}

export default NewReference
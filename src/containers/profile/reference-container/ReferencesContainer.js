import React, {useState} from 'react'

import ReferencesController from './ReferencesController'
import ReferencesView from './ReferencesView'
import ReferenceForm from '../../../components/profile/reference-container/ReferenceForm'

const ReferencesContainer = () => {

    const [isShowingRefForm, setIsShowingRefForm] = useState(false)

    return (
        <div id="resources-container">
            <ReferencesController
                isShowingRefForm={isShowingRefForm}
                setIsShowingRefForm={setIsShowingRefForm}
            />
            {isShowingRefForm ? <ReferenceForm setIsShowingRefForm={setIsShowingRefForm}/> :
            <ReferencesView isShowingRefForm={isShowingRefForm} setIsShowingRefForm={setIsShowingRefForm}/>}
        </div>
    )
}

export default ReferencesContainer
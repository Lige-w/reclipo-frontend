import React, {useState} from 'react'

import ReferencesConroller from './ReferencesController'
import ReferencesView from './ReferencesView'
import NewReference from './NewReference'

const ReferencesContainer = () => {

    const [isShowingRefForm, setIsShowingRefForm] = useState(false)

    return (
        <div id="resources-container">
            <ReferencesConroller
                isShowingRefForm={isShowingRefForm}
                setIsShowingRefForm={setIsShowingRefForm}
            />
            {isShowingRefForm ? <NewReference setIsShowingRefForm={setIsShowingRefForm}/> :
            <ReferencesView isShowingRefForm={isShowingRefForm} setIsShowingRefForm={setIsShowingRefForm}/>}
        </div>
    )
}

export default ReferencesContainer
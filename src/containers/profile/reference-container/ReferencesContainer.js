import React, {useState} from 'react'

import ResourcesConroller from './ReferencesController'
import ReferencesView from './ReferencesView'
import NewReference from "./NewReference"

const ReferencesContainer = () => {

    const [isShowingRefForm, setIsShowingRefForm] = useState(false)

    return (
        <div id="resources-container">
            <ResourcesConroller
                isShowingRefForm={isShowingRefForm}
                setIsShowingRefForm={setIsShowingRefForm}
            />
            <ReferencesView isShowingRefForm={isShowingRefForm} setIsShowingRefForm={setIsShowingRefForm}/>}
        </div>
    )
}

export default ReferencesContainer
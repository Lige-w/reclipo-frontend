import React from 'react'
import {Icon} from "semantic-ui-react";

const ReferencesController = ({setIsShowingRefForm, isShowingRefForm}) => {

    return (
        <div id="resources-controller">
            <span onClick={() => setIsShowingRefForm(!isShowingRefForm)}>
                <Icon name='file'/> Add a reference
            </span>
        </div>
    )
}

export default ReferencesController
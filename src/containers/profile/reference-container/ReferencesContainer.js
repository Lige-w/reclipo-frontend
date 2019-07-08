import React from 'react'

import ReferencesController from './ReferencesToolbar'
import ReferencesView from './ReferencesView'
import ReferenceForm from '../../../components/profile/reference-container/ReferenceForm'
import {connect} from "react-redux";

const ReferencesContainer = ({isShowingRefForm}) => {



    return (
        <div id="resources-container">
            <ReferencesController
            />
            {isShowingRefForm ? <ReferenceForm/> :
            <ReferencesView />}
        </div>
    )
}

export default connect(state =>({isShowingRefForm: state.isShowingRefForm}))(ReferencesContainer)
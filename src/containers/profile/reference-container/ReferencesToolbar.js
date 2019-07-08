import React from 'react'
import {Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {setIsShowingRefForm, setRefToEdit} from "../../../redux/actions/referenceActions";

const ReferencesToolbar = ({setIsShowingRefForm, isShowingRefForm, setRefToEdit}) => {

    return (
        <div id="resources-controller">
            <span className='controller-link'
                  onClick={() => {
                      setIsShowingRefForm(!isShowingRefForm)
                      setRefToEdit(null)
                  }}>
                <Icon name='file'/> <strong>{isShowingRefForm ? 'Close Form' : "Add a reference"}</strong>
            </span>
        </div>
    )
}

export default connect(
    state => ({isShowingRefForm: state.isShowingRefForm}),
    {setIsShowingRefForm, setRefToEdit}
)(ReferencesToolbar)
import React from 'react'
import {Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {setIsShowingRefForm, setRefToEdit} from "../../../redux/actions/referenceActions";

const ReferencesToolbar = ({setIsShowingRefForm, isShowingRefForm, setRefToEdit, currentProject, user}) => {

    return (
        <div id="resources-controller">
            <span className='controller-link'
                  onClick={() => {
                      setIsShowingRefForm(!isShowingRefForm)
                      setRefToEdit(null)
                  }}>
                <Icon name='file'/> <strong>{isShowingRefForm ? 'Close Form' : "Add a reference"}</strong>
            </span>
            <span className='float-right'><strong>{currentProject ? currentProject.title : user.username}</strong></span>
        </div>
    )
}

export default connect(
    state => ({
        isShowingRefForm: state.isShowingRefForm,
        currentProject: state.currentProject,
        user: state.user,
    }),
    {setIsShowingRefForm, setRefToEdit}
)(ReferencesToolbar)
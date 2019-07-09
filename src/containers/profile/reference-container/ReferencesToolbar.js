import React, {useEffect} from 'react'
import {Icon, Dropdown} from "semantic-ui-react";
import {connect} from "react-redux";
import {setIsShowingRefForm, setRefToEdit} from "../../../redux/actions/referenceActions";
import {requestGetUserTags} from "../../../redux/actions/tagActions";

const ReferencesToolbar = ({setIsShowingRefForm, isShowingRefForm, setRefToEdit, currentProject, user}) => {

    useEffect(() => requestGetUserTags(), [])

    const tagOptions = []
    return (
        <div id="resources-controller">
            <span className='controller-link'
                  onClick={() => {
                      setIsShowingRefForm(!isShowingRefForm)
                      setRefToEdit(null)
                  }}>
                <Icon name='file'/> <strong>{isShowingRefForm ? 'Close Form' : "Add a reference"}</strong>
            </span>
            <span>
                Filter by tag:
                <Dropdown
                    placeholder='State'
                    fluid
                    multiple
                    search
                    selection
                    options={tagOptions}
                />
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
import React, {useEffect} from 'react'
import {Icon, Dropdown, Menu} from "semantic-ui-react";
import {connect} from "react-redux";
import {setIsShowingRefForm, setRefToEdit} from "../../../redux/actions/referenceActions";
import {requestGetUserTags} from "../../../redux/actions/tagActions";

const ReferencesToolbar = ({setIsShowingRefForm, isShowingRefForm, setRefToEdit, currentProject, user}) => {

    useEffect(() => requestGetUserTags(), [])

    const tagOptions = []
    return (
        <Menu id="resources-controller">
            <Menu.Item>
            <span className='controller-link'
                  onClick={() => {
                      setIsShowingRefForm(!isShowingRefForm)
                      setRefToEdit(null)
                  }}>
                <Icon name='file'/> <strong>{isShowingRefForm ? 'Close Form' : "Add a reference"}</strong>
            </span>
            </Menu.Item>
            <Menu.Item>
            <Icon name='filter' />
                <Dropdown
                    text='Filter by tag'
                    labeled
                    selection
                    multiple
                    floating
                    search
                    options={tagOptions}
                />
            </Menu.Item>
            <Menu.Item position='right'>
            <span><strong>{currentProject ? currentProject.title : user.username}</strong></span>
            </Menu.Item>
        </Menu>
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
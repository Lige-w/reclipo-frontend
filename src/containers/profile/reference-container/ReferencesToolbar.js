import React, {useEffect} from 'react'
import {Icon, Dropdown, Menu} from "semantic-ui-react";
import {connect} from "react-redux";
import {setIsShowingRefForm, setRefToEdit} from "../../../redux/actions/referenceActions";
import {requestGetUserTags, setFilterTags} from "../../../redux/actions/tagActions";
import DeleteProjectModal from "../../../components/profile/DeleteProjectModal";

const ReferencesToolbar = ({
                               setIsShowingRefForm,
                               isShowingRefForm,
                               setRefToEdit,
                               currentProject,
                               user,
                               requestGetUserTags,
                               tags,
                               setFilterTags,
                               projects
                           }) => {

    useEffect(() =>{requestGetUserTags()}, [])

    const tagOptions = tags.map(tag => ({
        key: tag.id,
        text: tag.name,
        value: tag.id
    }))

    return (
        <Menu id="resources-controller">

            <Menu.Item>
                { projects.length?
                    <span className='controller-link'
                          onClick={() => {
                              setIsShowingRefForm(!isShowingRefForm)
                              setRefToEdit(null)
                          }}>
                <Icon name='file'/> <strong>{isShowingRefForm ? 'Close Form' : "Add a reference"}</strong>
            </span> :
                    null }
            </Menu.Item>
            <Menu.Item>
                <Icon name='filter' />
                <Dropdown
                    text='Filter by tag'
                    onChange={(e, {value}) => setFilterTags(value)}
                    labeled
                    selection
                    multiple
                    floating
                    search
                    options={tagOptions}
                />
            </Menu.Item>
            <Menu.Menu position='right'>
                {currentProject ?
                    <DeleteProjectModal title={currentProject.title} id={currentProject.id}/>
                    : null}
                <Menu.Item className='project-title' >
                    <span><strong>{currentProject ? currentProject.title : user.username}</strong></span>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default connect(
    state => ({
        isShowingRefForm: state.isShowingRefForm,
        currentProject: state.currentProject,
        user: state.user,
        tags: state.tags,
        projects: state.projects
    }),
    {setIsShowingRefForm, setRefToEdit, requestGetUserTags, setFilterTags}
)(ReferencesToolbar)
import React, {useState} from 'react'
import {connect} from "react-redux";
import {Modal, Button, Icon, Menu} from "semantic-ui-react";
import {requestDeleteProject} from "../../redux/actions/projectActions";
import {Link, withRouter} from "react-router-dom";

const DeleteProjectModal = ({id, title, requestDeleteProject, match}) => {
    const [isShowingModal, setIsShowingModal] = useState(false)


    const deleteProject = () => {
        requestDeleteProject(id)
        setIsShowingModal(false)

    }

    return (
        <Modal
            open={isShowingModal}
            onClose={()=> setIsShowingModal(false)}
            trigger={<Menu.Item onClick={() => setIsShowingModal(true)}><Icon  size="large" name='delete'/><strong>Delete Project</strong></Menu.Item>}
            closeIcon
        >
            <Modal.Header>Delete Project</Modal.Header>
            <Modal.Content>Are you sure you want to delete your project: {title}?</Modal.Content>
            <Modal.Actions>
                <Link to={match.path} ><Button onClick={deleteProject} content='Yes' icon='checkmark' /></Link>
                <Button onClick={() => setIsShowingModal(false)} content='No' negative icon='delete'/>
            </Modal.Actions>
        </Modal>
    )
}

export default withRouter(connect(null, {requestDeleteProject})(DeleteProjectModal))
import React, {useState} from 'react'
import {connect} from "react-redux";
import {Modal, Button, Icon, Menu} from "semantic-ui-react";
import {requestDeleteProject} from "../../redux/actions/projectActions";

const DeleteProjectModal = ({id, title, requestDeleteProject}) => {
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
                <Button onClick={deleteProject} content='Yes' icon='checkmark' />
                <Button onClick={() => setIsShowingModal(false)} content='No' negative icon='delete'/>
            </Modal.Actions>
        </Modal>
    )
}

export default connect(null, {requestDeleteProject})(DeleteProjectModal)
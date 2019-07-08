import React, {useState} from 'react'
import {connect} from "react-redux";
import {Button, Modal} from "semantic-ui-react";
import {requestDeleteNote} from "../../../redux/actions/noteActions";

const DeleteNoteModal = ({name, note, requestDeleteNote}) => {

    const [isShowingModal, setIsShowingModal] = useState(false)

    const deleteNote = () => {
        requestDeleteNote(note)
        setIsShowingModal(false)
    }

    return (
        <Modal open={isShowingModal} trigger={<Button onClick={() => setIsShowingModal(true)} icon='trash'/>} >
            <Modal.Header>Delete Note</Modal.Header>
            <Modal.Content>Are you sure you want to delete {name}?</Modal.Content>
            <Modal.Actions>
                <Button onClick={deleteNote} content='Yes' icon='checkmark' />
                <Button onClick={() => setIsShowingModal(false)} content='No' negative icon='delete'/>
            </Modal.Actions>
        </Modal>
    )
}

export default connect(null, {requestDeleteNote})(DeleteNoteModal)
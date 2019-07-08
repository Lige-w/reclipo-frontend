import React, {useState} from 'react'
import {connect} from "react-redux";
import {Button, Modal, Input, Label} from "semantic-ui-react";
import {requestUpdateNoteName} from "../../../redux/actions/noteActions";

const RenameNoteModal = ({note, requestUpdateNoteName}) => {
    const [isShowingModal, setIsShowingModal] = useState(false)
    const [name, setName] = useState('')

    const renameNote = () => {
        requestUpdateNoteName(name, note.id)
        setIsShowingModal(false)
    }

    // Submit on enter press because using Form causes formatting issues
    const handleEnter = ({key}) => {
        if (key === 'Enter') {
            renameNote()
        }
    }

    return (
        <Modal
            onClose={() => setIsShowingModal(false)}
            open={isShowingModal}
            trigger={<Button onClick={() => setIsShowingModal(true)} icon='pencil'/>}
            size='tiny'
        >
            <Modal.Header>Rename Note</Modal.Header>
            <Modal.Content>
                <Input
                    onKeyDown={handleEnter}
                    onChange={(e, {value}) => setName(value)}
                    value={name}
                    fluid
                    placeholder='Enter new name...'
                />
            </Modal.Content>
            <Modal.Actions>
                <Button type='button' onClick={renameNote} content='Rename' />
                <Button onClick={() => setIsShowingModal(false)} content='Cancel' negative icon='delete'/>
            </Modal.Actions>
        </Modal>
    )
}

export default connect(null, {requestUpdateNoteName})(RenameNoteModal)
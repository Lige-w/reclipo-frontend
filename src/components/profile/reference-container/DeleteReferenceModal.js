import React, {useState} from 'react'
import {connect} from "react-redux";
import {Modal, Button, Icon, Dropdown} from "semantic-ui-react";

import {requestDeleteReference} from "../../../redux/actions/referenceActions";


const DeleteReferenceModal = ({reference, requestDeleteReference}) => {
    const [isShowingModal, setIsShowingModal] = useState(false)


    const deleteReference = () => {
        requestDeleteReference(reference.id)
        setIsShowingModal(false)
    }

    return (

            <Modal
                trigger={
                    <Dropdown.Item onClick={()=>setIsShowingModal(true)}>
                        <span><Icon name='trash'/> Delete Reference</span>
                    </Dropdown.Item>
                }
                open={isShowingModal}
                onClose={()=> setIsShowingModal(false)}
            >
                <Modal.Header><Icon name='trash'/> Delete Reference</Modal.Header>
                <Modal.Content>Are you sure you want to delete this reference?</Modal.Content>
                <Modal.Actions>
                    <Button onClick={deleteReference} content='Yes' icon='checkmark' />
                    <Button onClick={()=> setIsShowingModal(false) } content='No' negative icon='delete'/>
                </Modal.Actions>
            </Modal>

    )
}

export default connect(null, {requestDeleteReference})(DeleteReferenceModal)
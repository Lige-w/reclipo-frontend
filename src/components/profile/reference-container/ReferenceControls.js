import React, {useState} from 'react'
import {connect} from "react-redux";
import {Button, Dropdown, Icon, Modal} from "semantic-ui-react";

import {setIsShowingRefForm, setRefToEdit, requestDeleteReference} from "../../../redux/actions/referenceActions";

const ReferenceControls = ({requestDeleteReference, reference, setIsShowingRefForm, setRefToEdit}) => {
    const [isShowingModal, setIsShowingModal] = useState(false)

    const deleteReference = () => {
        requestDeleteReference(reference.id)
        setIsShowingModal(false)
    }

    const editReference = () => {
        setIsShowingRefForm(true)
        setRefToEdit(reference)
    }

    return (
        <Dropdown icon='setting' className='float-right'>
            <Dropdown.Menu className='reference-control-menu'>
                <Dropdown.Item onClick={()=>setIsShowingModal(true)} >
                    <Modal
                        trigger={
                            <span><Icon name='trash'/> Delete Reference</span>
                        }
                        open={isShowingModal}
                        onClose={()=> setIsShowingModal(false)}
                    >
                        <Modal.Header><Icon name='trash'/> Delete Reference</Modal.Header>
                        <Modal.Content>Are you sure you want to delete this reference?</Modal.Content>
                        <Modal.Actions>
                            <Button onClick={deleteReference} content='Yes' icon='checkmark' />
                            <Button onClick={()=>setIsShowingModal(false)} content='No' negative icon='delete'/>
                        </Modal.Actions>
                    </Modal>
                </Dropdown.Item>
                <Dropdown.Item onClick={editReference}>
                    <span><Icon name='edit'/> Edit Reference</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default connect(
    null,
    {requestDeleteReference, setIsShowingRefForm, setRefToEdit}
    )(ReferenceControls)
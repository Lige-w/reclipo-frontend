import React, {useState} from 'react'

import {Modal, Header, Icon, Form, Input, TextArea, Button} from "semantic-ui-react";

const NewProject = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const createProject = () => {

    }

    return (
        <Modal
            trigger={<div><Icon name='add'/> <strong>New Project</strong></div>}
            closeIcon
        >
            <Header icon='add' content={'New Project'}/>
            <Modal.Content>
                <Form onSubmit={createProject}>
                    <Form.Field
                        control={Input}
                        onChange={(e) => setTitle(e.target.value)}
                        label='Title'
                        placeholder='Title'
                    />
                    <Form.Field
                        control={TextArea}
                        onChange={e => setDescription(e.target.value)}
                        label='Description'
                        placehoder='Description'
                    />
                    <Form.Field type='submit' control={Button}>Create Project</Form.Field>
                </Form>
            </Modal.Content>
        </Modal>
    )
}

export default NewProject
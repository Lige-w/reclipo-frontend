import React from 'react'
import {Form, Input} from "semantic-ui-react";

const AuthorFields = ({authorsAttributes, setAuthorsAttributes, i, creatorType}) => {

    const setAuthorName = (e, {value}) => {
        const authorsAttributesCopy = [...authorsAttributes]
        authorsAttributesCopy[i][e.target.name] = value
        setAuthorsAttributes(authorsAttributesCopy)
    }

    return (
        <Form.Group key={`author-field-${i}`}>
            <Form.Field
                control={Input}
                label={`${creatorType()}'s Last Name`}
                placeholder={`${creatorType()}'s Last Name`}
                value={authorsAttributes[i].lastName}
                onChange={setAuthorName}
                name='lastName'
            />
            <Form.Field
                control={Input}
                label={`${creatorType()}'s First Name`}
                placeholder={`${creatorType()}'s First Name`}
                value={authorsAttributes[i].firstName}
                onChange={setAuthorName}
                name='firstName'
            />
            <Form.Field
                control={Input}
                label={`${creatorType()}'s Middle Initial`}
                placeholder={`${creatorType()}'s Middle Initial`}
                value={authorsAttributes[i].middleInitial}
                onChange={setAuthorName}
                name='middleInitial'
            />
        </Form.Group>
    )
}

export default AuthorFields
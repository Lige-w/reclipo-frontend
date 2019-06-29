import React, {useState, useEffect} from 'react'
import {Form, Dropdown, Input} from "semantic-ui-react";
import {
    referenceTypes,
    printReferenceMedia,
    otherReferenceMedia,
    onlineReferenceMedia
} from '../../../helpers/referenceHelper'



const ReferenceForm = () => {

    const [type, setType] = useState(referenceTypes[0])
    const [medium, setMedium] = useState(null)

    const mediaForSelectedType = () => {
        switch(type) {
            case 'Print':
                return printReferenceMedia
            case 'Online':
                return onlineReferenceMedia
            case 'Other':
                return otherReferenceMedia
            default:
                return printReferenceMedia
        }

    }

    useEffect(() => {setMedium(mediaForSelectedType()[0])}, [type])

    const mediumOptions = mediaForSelectedType().map(medium => ({key: medium, value: medium, text: medium}))
    const typeOptions = referenceTypes.map(type => ({key: type, value: type, text: type}))

    return(
        <Form>
            <Form.Field>
                <label>Type</label>
                <Dropdown
                    search
                    selection
                    value={type}
                    onChange={(e, {value})=> setType(value)}
                    options={typeOptions}
                />
            </Form.Field>
            <Form.Field>
                <label>Medium</label>
                <Dropdown
                    search
                    selection
                    value={medium}
                    onChange={(e, {value})=> setMedium(value)}
                    options={mediumOptions}
                />
            </Form.Field>
            <Form.Field control={Input} label="Author's Last Name" placeholder="Author's Last Name"/>
            <Form.Field control={Input} label="Author's First Name" placeholder="Author's First Name"/>
            <Form.Field control={Input} label="Author's Middle Initial" placeholder="Author's Middle Initial"/>
            <Form.Field control={Input} label="Title" placeholder="Title"/>
            <Form.Field control={Input} label="Date Published" placeholder="Date Published" type='date'/>
            <Form.Field control={Input} label='Publisher Location' placeholder='Publisher Location'/>
            <Form.Field control={Input} label='Publisher' placeholder='Publisher' />
            {type === 'Online' ?
                <Form.Field control={Input} label='URL' placeholder='URL'/>
            : null}
            <Form.Field control={Input} label='Page Numbers' placeholder='Page Numbers' />
            {}

        </Form>
    )
}

export default ReferenceForm
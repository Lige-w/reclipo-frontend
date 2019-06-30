import React, {useState, useEffect} from 'react'
import {Form, Select, Input, Button} from "semantic-ui-react";
import {
    referenceTypes,
    printReferenceMedia,
    otherReferenceMedia,
    onlineReferenceMedia
} from '../../../helpers/referenceHelper'

import AuthorFields from './AuthorFields'

const ReferenceForm = () => {

    const [type, setType] = useState(referenceTypes[0])
    const [medium, setMedium] = useState(null)
    const [numberOfAuthors, setNumberOfAuthors] = useState(1)
    const [authorsAttributes, setAuthorsAttributes] = useState([
        {firstName: '', lastName: '', middleInitial: ''}
    ])
    const [title, setTitle] = useState('')
    const [datePublished, setDatePublished] = useState('')
    const [publisherLocation, setPublisherLocation] = useState('')
    const [publisher, setPublisher] = useState('')
    const [url, setUrl] = useState('')
    const [pageNumbers, setPageNumbers] = useState('')
    const [volumeNumber, setVolumeNumber] = useState('')
    const [issueNumber, setIssueNumber] = useState('')

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

    const creatorType = () => {
        switch(medium) {
            case 'Film':
                return 'Director'
            case 'Song':
                return 'Songwriter'
            case 'Edited Book':
                return 'Editor'
            case 'Video':
                return 'Creator'
            default:
                return 'Author'
        }
    }

    useEffect(() => {setMedium(mediaForSelectedType()[0])}, [type])

    const createReference = () => {
        const body = {
            type,
            medium,
            number_of_authors: numberOfAuthors,
            authors_attributes: authorsAttributes,
            title,
            date_published: datePublished,
            publisher_location: publisherLocation,
            publisher,
            url,
            page_numbers: pageNumbers
        }
    }

    const changeNumberOfAuthors = (e, {value}) => {
        const intValue = parseInt(value)

        if (numberOfAuthors > intValue) {
            setAuthorsAttributes(authorsAttributes.slice(0, intValue))
        } else if (numberOfAuthors < intValue) {
            const numberOfFieldsToAdd = intValue - numberOfAuthors
            const fieldsToAdd = Array(numberOfFieldsToAdd).fill().map(() => (
                    {firstName: '', lastName: '', middleInitial: ''}
                )
            )
            setAuthorsAttributes(authorsAttributes.concat(fieldsToAdd))
        }
        setNumberOfAuthors(intValue)
    }

    const mediumOptions = mediaForSelectedType().map(medium => ({key: medium, value: medium, text: medium}))

    const typeOptions = referenceTypes.map(type => ({key: type, value: type, text: type}))

    const authorsFields = authorsAttributes.map((author, i) => (
        <AuthorFields
            key={`author-fields-${i}`}
            authorsAttributes={authorsAttributes}
            setAuthorsAttributes={setAuthorsAttributes}
            i={i}
            creatorType={creatorType}
        />
    ))

    return(
        <Form onSubmit={createReference}>
            <Form.Group>
                <Form.Field
                    control={Select}
                    label='Type'
                    search
                    selection
                    value={type}
                    onChange={(e, {value})=> setType(value)}
                    options={typeOptions}
                />
                <Form.Field
                    control={Select}
                    label='Medium'
                    search
                    selection
                    value={medium}
                    onChange={(e, {value})=> setMedium(value)}
                    options={mediumOptions}
                />
                <Form.Field
                    control={Input}
                    onChange={changeNumberOfAuthors}
                    label={`Number of ${creatorType()}s`}
                    placeholder={`Number of ${creatorType()}s`}
                    value={numberOfAuthors}
                    min='1'
                    type='number'
                />
            </Form.Group>
            {authorsFields}
            <Form.Field
                control={Input}
                multiple
                label="Title"
                placeholder="Title"
                onChange={(e,{value}) => setTitle(value)}
                value={title}
            />
            <Form.Field
                control={Input}
                label="Date Published"
                placeholder="Date Published" type='date'
                onChange={(e,{value}) => setDatePublished(value)}
                value={datePublished}
            />
            <Form.Field
                control={Input}
                label='Publisher Location'
                placeholder='Publisher Location'
                onChange={(e,{value}) => setPublisherLocation(value)}
                value={publisherLocation}
            />
            <Form.Field
                control={Input}
                label='Publisher'
                placeholder='Publisher'
                onChange={(e,{value}) => setPublisher(value)}
                value={publisher}
            />
            {medium === ''}
            {type === 'Online' ?
                <Form.Field control={Input} label='URL' placeholder='URL' onChange={(e,{value}) => setUrl(value)}/>
                : null}
            {type === 'Print' ?
                <Form.Field
                    control={Input}
                    label='Page Numbers'
                    placeholder='Page Numbers'
                    onChange={(e,{value}) => setPageNumbers(value)}/>
                : null}

            <Button type='submit'>Create Reference</Button>
        </Form>
    )
}

export default ReferenceForm
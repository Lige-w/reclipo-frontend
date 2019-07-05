import React, {useState, useEffect} from 'react'
import {Form, Select, Input, Button} from "semantic-ui-react";
import {connect} from "react-redux";
import {
    referenceTypes,
    printReferenceMedia,
    otherReferenceMedia,
    onlineReferenceMedia
} from '../../../helpers/referenceHelper'

import {
    requestCreateReference, requestEditReference, setIsShowingRefForm
} from "../../../redux/actions/referenceActions";

import AuthorFields from './AuthorFields'

const ReferenceForm = ({requestCreateReference, requestEditReference, projectId, setIsShowingRefForm, refToEdit}) => {

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
    const [tags, setTags] = useState('')

    useEffect(() => {
        if (refToEdit) {
            const {
                authors,
                issue_number,
                medium,
                page_numbers,
                publish_date,
                publisher,
                publisher_location,
                reference_type,
                tags,
                title,
                url,
                volume_number
            } = refToEdit

            setNumberOfAuthors(authors.length)
            setAuthorsAttributes(authors.map(author => ({
                firstName: author.first_name, lastName: author.last_name, middleInitial: author.middle_initial
            })))
            setIssueNumber(issue_number)
            setMedium(medium)
            setPageNumbers(page_numbers)
            setDatePublished(publish_date)
            setPublisher(publisher)
            setPublisherLocation(publisher_location)
            setType(reference_type)
            setTags(tags.map(tag => tag.name).join(', '))
            setTitle(title)
            setUrl(url)
            setVolumeNumber(volume_number)
        }
    },[])

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

    useEffect(() => {
        if(!mediaForSelectedType().includes(medium))setMedium(mediaForSelectedType()[0])
    }, [type])

    const submitReference = () => {
        const tags_attributes = tags.split(/,\s*/).map(tag => ({name: tag}))
        const authors_attributes = authorsAttributes
            .filter(author => !!author.firstName || !!author.lastName)
            .map(({lastName, firstName, middleInitial}) => (
            {last_name: lastName, first_name: firstName, middle_initial: middleInitial}
            ))


        const body = {reference: {
            reference_type: type,
            medium,
            authors_attributes,
            title,
            publish_date: datePublished,
            publisher_location: publisherLocation,
            publisher,
            url,
            page_numbers: pageNumbers,
            volume_number: volumeNumber,
            issue_number: issueNumber,
            tags_attributes,

        }}
        if (refToEdit) {
            body.current_project = projectId
            body.reference.id = refToEdit.id
            requestEditReference(body)
        } else {
            body.project_ids = [projectId]
            requestCreateReference(body)
        }
        setIsShowingRefForm(false)
    }

    const changeNumberOfAuthors = (e, {value}) => {
        const  intValue = parseInt(value) >= 0 ? parseInt(value) : 0

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
        <div id='reference-form'>
        <Form  onSubmit={submitReference}>
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
                    min='0'
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
                    onChange={(e,{value}) => setPageNumbers(value)}
                    value={pageNumbers}
                />
                : null}
            {['Journal', 'Magazine', 'Newspaper'].includes(medium) ?
                <Form.Group>
                    <Form.Field control={Input} label='Volume Number' placeholder='Volume Number'  onChange={(e,{value}) => setVolumeNumber(value)}/>
                    <Form.Field control={Input} label='Issue Number' placeholder='Issue Number' onChange={(e,{value}) => setIssueNumber(value)}/>
                </Form.Group>
                : null}
                <Form.Field
                    control={Input}
                    label='Tags'
                    placeholder='Enter any tags for this reference separated by commas (",")'
                    onChange={(e, {value}) => setTags(value)}
                    value={tags}
                />
            <Button type='submit'>{refToEdit? "Update" : "Create"} Reference</Button>
        </Form>
        </div>
    )
}

export default connect(
    state => ({
        projectId: state.currentProject.id,
        refToEdit: state.refToEdit
    }),
    {requestCreateReference, requestEditReference, setIsShowingRefForm}
    )(ReferenceForm)
import React, {useState, useEffect, Fragment} from 'react'
import {Form, Select, Input, Button, Icon} from "semantic-ui-react";
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

const ReferenceForm = (
    {requestCreateReference, requestEditReference, currentProject, setIsShowingRefForm, refToEdit, projects}
) => {
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
    const [projectIds, setProjectIds] = useState([])

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
                volume_number,
                projects
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
            setProjectIds(projects.map(project => project.id))
        } else if (currentProject && !refToEdit) {
            setProjectIds([currentProject.id])
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
            case 'Edited Book':
                return 'Editor/Author'
            case 'Audio':
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
        if (!projectIds.length) {return alert('Reference must be associated with at least one project')}
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
                project_ids: projectIds
            }}
        if (refToEdit) {
            body.reference.id = refToEdit.id
            requestEditReference(body)
        } else {
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

    const projectOptions = projects.map(({id, title}) => ({key: id, value: id, text: title}))

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
                <Icon onClick={()=>{setIsShowingRefForm(false)}} className='float-right' size='large' name='delete' />
            <Form  onSubmit={submitReference}>
                <Form.Group>
                    <Form.Field
                        width={6}
                        control={Select}
                        label='Type'
                        search
                        selection
                        value={type}
                        onChange={(e, {value})=> setType(value)}
                        options={typeOptions}
                    />
                    <Form.Field
                        width={6}
                        control={Select}
                        label='Medium'
                        search
                        selection
                        value={medium}
                        onChange={(e, {value})=> setMedium(value)}
                        options={mediumOptions}
                    />
                    <Form.Field
                        width={6}
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
                <Form.Group>
                    { medium === 'Journal' || medium === 'Newspaper' || medium === 'Magazine' ?
                        <Fragment>
                            <Form.Field
                                width={6}
                                fluid
                                control={Input}
                                label='Article Title'
                                placeholder='Article Title'
                                onChange={(e, {value}) => setTitle(value)}
                                value={title}
                            />
                            <Form.Field
                                width={6}
                                fluid
                                control={Input}
                                label={medium}
                                placeholder={medium}
                                onChange={(e, {value}) => setPublisher(value)}
                                value={publisher}
                            />
                        </Fragment>
                        : <Form.Field
                            width={12}
                            control={Input}
                            multiple
                            label="Title"
                            placeholder="Title"
                            onChange={(e, {value}) => setTitle(value)}
                            value={title}
                        />
                    }
                    < Form.Field
                        width={4}
                        control={Input}
                        label="Date Published"
                        placeholder="Date Published" type='date'
                        onChange={(e,{value}) => setDatePublished(value)}
                        value={datePublished}
                    />
                </Form.Group>
                <Form.Group>
                {['Journal', 'Magazine', 'Newspaper'].includes(medium) ?
                    <Fragment>
                        <Form.Field
                            width={8}
                            control={Input}
                            label='Volume Number'
                            placeholder='Volume Number'
                            onChange={(e,{value}) => setVolumeNumber(value)}
                        />
                        <Form.Field
                            width={8}
                            control={Input}
                            label='Issue Number'
                            placeholder='Issue Number'
                            onChange={(e,{value}) => setIssueNumber(value)}
                        />
                    </Fragment>
                    : null}
                { medium === 'Book' ?
                    <Fragment>
                        <Form.Field
                            width={8}
                            control={Input}
                            label='Publisher Location'
                            placeholder='Publisher Location'
                            onChange={(e, {value}) => setPublisherLocation(value)}
                            value={publisherLocation}
                        />
                        < Form.Field
                            width={8}
                            control={Input}
                            label='Publisher'
                            placeholder='Publisher'
                            onChange={(e,{value}) => setPublisher(value)}
                            value={publisher}
                        />
                    </Fragment>  : null
                }
                </Form.Group>

                {type === 'Print' || medium === 'Journal' ?
                    <Form.Field
                        control={Input}
                        label='Page Numbers'
                        placeholder='Page Numbers'
                        onChange={(e,{value}) => setPageNumbers(value)}
                        value={pageNumbers}
                    />
                    : null}
                {type === 'Online' ?
                    <Form.Field control={Input} label='URL' placeholder='URL' onChange={(e,{value}) => setUrl(value)}/>
                    : null}
                <Form.Field
                    control={Input}
                    label='Tags'
                    placeholder='Enter any tags for this reference separated by commas (",")'
                    onChange={(e, {value}) => setTags(value)}
                    value={tags}
                />
                <Form.Field
                    control={Select}
                    multiple
                    label='Projects'
                    options={projectOptions}
                    value={projectIds}
                    onChange={(e, {value}) => setProjectIds(value)}
                />
                <Button type='submit'>{refToEdit? "Update" : "Create"} Reference</Button>
            </Form>
        </div>
    )
}

export default connect(
    state => ({
        projects: state.projects,
        currentProject: state.currentProject,
        refToEdit: state.refToEdit
    }),
    {requestCreateReference, requestEditReference, setIsShowingRefForm}
)(ReferenceForm)
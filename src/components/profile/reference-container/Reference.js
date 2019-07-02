import React from 'react'
import {connect} from "react-redux";
import {Button, Icon} from "semantic-ui-react";

const Reference = ({reference: {
    id,
    title,
    publisher,
    publisher_location: publisherLocation,
    publish_date: publishDate,
    medium,
    reference_type: type,
    url,
    page_numbers: pageNumbers,
    volume_number: volumeNumber,
    issue_number: issueNumber,
    tags,
    authors
}}) => {

    const createNote = (id) => {
        requestCreateNote(id)
    }

    const authorElements = authors.map(({id, first_name, last_name, middle_initial}, i) => {
        if (i === 0) {
            return <span key={id}>{last_name}, {first_name ? `${first_name[0]}. ` : null}{middle_initial ? `${middle_initial}.` : null}</span>
        } else if (i === authors.length - 1) {
            return <span key={id}> & {last_name}, {first_name ? `${first_name[0]}. ` : null}{middle_initial ? `${middle_initial}.` : null}</span>
        } else if (i > 6) {
            return null
        } else if (i === 6) {
            return <span> ...</span>
        } else {
            return <span key={id}>, {last_name}, {first_name ? `${first_name[0]}. ` : null}{middle_initial ? `${middle_initial}.` : null}</span>
        }
    })

    const tagsElement = tags.map(tag => tag.name).join(' ')



    return (
        <div className='reference'>
            <div className="reference-header">{medium} <span className="float-right"><strong>Tags: </strong>{tagsElement}</span></div>
            <div className="reference-details">
                {authorElements}({publishDate.split('-')[0]}) <em>{title}</em>. {publisherLocation}: {publisher}
            </div>
            <div className='new-note' onClick={createNote}><Icon name='add'/> <strong>Add Note</strong></div>
        </div>
    )
}

export default connect()(Reference)
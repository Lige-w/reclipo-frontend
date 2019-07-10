import React from 'react'

import NotesContainer from '../../../containers/profile/reference-container/NotesContainer'
import ReferenceControls from './ReferenceControls'
import Citation from "./Citation";


const Reference = ({requestCreateNote, reference, reference: {
    id,
    medium,
    reference_type: type,
    tags,
    notes
}}) => {

    const tagsElement = tags.map(tag => tag.name).join(', ')

    const sortedNotes = notes.sort((a, b) => Date.parse(a.created_at) - Date.parse(b.created_at))


    return (
        <div className='reference'>
            <ReferenceControls reference={reference}/>
            <div className="reference-header"><strong>{type}: {medium}</strong></div>
            <div className="reference-details">
                <Citation reference={reference}/>
            </div>
            <NotesContainer referenceId={id} notes={sortedNotes}/>
            <div className='tags'><strong>Tags: </strong>{tagsElement}</div>
        </div>
    )
}

export default Reference
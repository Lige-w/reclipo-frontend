import React, {Fragment, useState} from 'react'
import {connect} from "react-redux";
import {Icon, Tab, Dropdown} from "semantic-ui-react";

import {requestCreateNote} from "../../../redux/actions/noteActions";

const NotesContainer = ({notes, referenceId, requestCreateNote}) => {

    const [isShowingNotes, setIsShowingNotes] = useState(false)
    const [selectedNoteIndex, setSelectedNoteIndex] = useState(0)


    const createNote = () => {
        const body = {
            reference_id: referenceId,
            content: JSON.stringify({})
        }
        requestCreateNote(body)
    }

    const noteOptions = notes.map((note, i) => (
        {
            key: note.id,
            text: note.name || `Note ${i + 1}`,
            value: i
        }
    ))

    const notePanes = notes.length < 6 ?
        notes.map((note , i)=> (
            {menuItem: note.name || `Note ${i + 1}`, render: () => <Tab.Pane>THis is a Note</Tab.Pane>}
        ))
        :
        [{menuItem: <Dropdown
                scrolling
                item
                className='note-dropdown'
                text={notes[selectedNoteIndex].name || `Note ${selectedNoteIndex + 1}`}
                value={selectedNoteIndex}
                onChange={(e, {value}) => setSelectedNoteIndex(value)}
                options={noteOptions} />,
            render: () => <Tab.Pane>This is Note: {notes[selectedNoteIndex].id}</Tab.Pane>}]
    return (
        <Fragment>
            <div className='new-note' onClick={createNote}><Icon name='add'/> <strong>Add Note</strong></div>
            {!!notes.length ?
                <Fragment>
                    <div className='show-note' onClick={() => setIsShowingNotes(!isShowingNotes)}>
                        {isShowingNotes ?
                            <span><Icon name='triangle down'/> <strong>Hide Notes</strong></span>
                            : <span><Icon name='triangle left'/> <strong>Show Notes</strong></span>}
                    </div>
                    {isShowingNotes ?
                        <Tab  panes={notePanes}/>
                        : null}
                </Fragment>
                :null}
        </Fragment>
    )
}

export default connect(null, {requestCreateNote})(NotesContainer)
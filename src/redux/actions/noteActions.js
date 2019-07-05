import {authDeleteFetch, authPostFetch, NOTES_URL} from "../../helpers/fetch";

const requestCreateNote = (body) => {
    return dispatch => {
        return authPostFetch(NOTES_URL, body)
            .then(note => dispatch(addNoteToReference(note)))
    }
}

const addNoteToReference = (note) => ({
    type: "ADD_NOTE_TO_REFERENCE", note
})

const updateNoteContent = (note) => ({
    type: 'UPDATE_NOTE_CONTENT', note
})

const requestDeleteNote = (note) => (
    dispatch => {
        return authDeleteFetch(NOTES_URL + note.id)
            .then(message => dispatch(deleteNote(note)))
    }
)

const deleteNote = (note) => ({
    type: 'DELETE_NOTE', note
})


export {requestCreateNote, updateNoteContent, requestDeleteNote}


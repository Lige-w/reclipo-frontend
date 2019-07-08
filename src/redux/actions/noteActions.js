import {authDeleteFetch, authPatchFetch, authPostFetch, NOTES_URL} from "../../helpers/fetch";

const requestCreateNote = (body) => {
    return dispatch => {
        return authPostFetch(NOTES_URL, body)
            .then(note => dispatch(addNoteToReference(note)))
    }
}

const requestUpdateNoteName = (name, id) => (
    dispatch => {
        return authPatchFetch(NOTES_URL + id, {note: {name}})
            .then(note => dispatch(updateNoteName(note)))
    }
)

const requestDeleteNote = (note) => (
    dispatch => {
        return authDeleteFetch(NOTES_URL + note.id)
            .then(message => dispatch(deleteNote(note)))
    }
)

const addNoteToReference = (note) => ({
    type: "ADD_NOTE_TO_REFERENCE", note
})

const updateNoteContent = (note) => ({
    type: 'UPDATE_NOTE_CONTENT', note
})

const updateNoteName = (note) => ({
    type: 'UPDATE_NOTE_NAME', note
})

const deleteNote = (note) => ({
    type: 'DELETE_NOTE', note
})


export {requestCreateNote, updateNoteContent, requestDeleteNote, requestUpdateNoteName}


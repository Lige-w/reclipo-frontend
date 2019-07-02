import {authPostFetch, NOTES_URL} from "../../helpers/fetch";

const requestCreateNote = (body) => {
    return dispatch => {
        return authPostFetch(NOTES_URL, body)
            .then(note => dispatch(addNoteToReference(note)))
    }
}

const addNoteToReference = (note) => ({
    type: "ADD_NOTE_TO_REFERENCE", note
})

export {requestCreateNote}


const referencesReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_REFERENCES':
            return action.references
        case 'ADD_NOTE_TO_REFERENCE': {
            const stateCopy = [...state]
            const reference = stateCopy.find(reference => reference.id === action.note.reference_id)
            reference.notes = [...reference.notes, action.note]
            return stateCopy
        }
        case 'UPDATE_NOTE_CONTENT': {
            const stateCopy = [...state]
            const note = stateCopy.find(reference => reference.id === action.note.reference_id)
                .notes.find(note => note.id === action.note.id)
            note.content = action.note.content
            return stateCopy
        }
        default:
            return state
    }
}

export {referencesReducer}
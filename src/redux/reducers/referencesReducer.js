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
            let note = stateCopy.find(reference => reference.id === action.note.reference_id)
                .notes.find(note => note.id === action.note.id)
            note.content = action.note.content
            return stateCopy
        }
        case 'UPDATE_NOTE': {
            const stateCopy = [...state]
            const reference = stateCopy.find(reference => reference.id === action.note.reference_id)
            const notesCopy = [...reference.notes]
            const noteIndex = reference.notes.findIndex(note => note.id === action.note.id)
            notesCopy.splice(noteIndex, 1, action.note)
            reference.notes = notesCopy
            return stateCopy
        }
        case 'ADD_REFERENCE': {
            return [...state, action.reference]
        }
        case 'UPDATE_REFERENCE': {
            const stateCopy = [...state]
            const referenceIndex = stateCopy.findIndex(reference => reference.id === action.reference.id)
            stateCopy.splice(referenceIndex, 1, action.reference)
            return stateCopy
        }
        case 'DELETE_REFERENCE': {
            return state.filter(reference => reference.id !== action.id)
        }
        case 'DELETE_NOTE':
            const stateCopy = [...state]
            const reference = stateCopy.find(reference => reference.id === action.note.reference_id)
            reference.notes = reference.notes.filter(note => note.id !== action.note.id)
            return stateCopy
        default:
            return state
    }
}

export {referencesReducer}
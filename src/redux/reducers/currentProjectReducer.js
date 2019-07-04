const currentProjectReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_CURRENT_PROJECT':
            return action.project
        case 'UNSET_CURRENT_PROJECT':
            if (state.id === action.id) {return null}
            else {return state}
        case 'ADD_NOTE_TO_REFERENCE':
            const reference = state.references.find(reference => reference.id === action.note.reference_id)
            reference.notes = [...reference.notes, action.note]
            return {...state}
        case 'UPDATE_NOTE_CONTENT':
           const note = state.references.find(reference => reference.id === action.note.reference_id)
                .notes.find(note => note.id===action.note.id)
            note.content = action.note.content
            return {...state}
        default: return state
    }
}

export {currentProjectReducer}
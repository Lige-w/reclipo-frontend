const currentProjectReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_CURRENT_PROJECT':
            return action.project
        case 'ADD_NOTE_TO_REFERENCE':
            const reference = state.references.find(reference => reference.id === action.note.reference_id)
            reference.notes = [...reference.notes, action.note]
            return {...state}
        default: return state
    }
}

export {currentProjectReducer}
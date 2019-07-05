const currentProjectReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_CURRENT_PROJECT':
            return action.project
        case 'UNSET_CURRENT_PROJECT':
            if (state.id === action.id) {return null}
            else {return state}
        case 'DELETE_NOTE':
            const stateCopy = {...state}
            const copyOfReferences = [...stateCopy.references]
            const referenceCopy = copyOfReferences.find(reference => reference.id === action.note.reference_id)
            referenceCopy.notes = referenceCopy.notes.filter(note => note.id !== action.note.id)
            stateCopy.references = copyOfReferences
            return stateCopy
        default: return state
    }
}

export {currentProjectReducer}
const currentProjectReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_CURRENT_PROJECT':
            return action.project
        case 'UNSET_CURRENT_PROJECT':
            if (state.id === action.id) {return null}
            else {return state}
        default: return state
    }
}

export {currentProjectReducer}
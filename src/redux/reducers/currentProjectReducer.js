const currentProjectReducer = (state = null, action) => {
    switch(action.type){
        case 'SET_CURRENT_PROJECT':
            return action.project
        default: return state
    }
}

export {currentProjectReducer}
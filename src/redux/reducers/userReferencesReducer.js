const userReferencesReducer = (state=[], action) => {
    switch(action.type) {
        case 'SET_USER_REFERENCES':
            debugger
            return action.references
        default:
            return state
    }
}

export {userReferencesReducer}
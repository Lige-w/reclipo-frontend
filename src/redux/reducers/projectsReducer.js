const projectsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
            return [...state, action.project]
        default:
            return state
    }
}

export {projectsReducer}
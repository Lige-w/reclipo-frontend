const projectsReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PROJECT':
            return [...state, action.project]
        case 'FETCHED_PROJECTS':
            return action.projects
        case 'DELETE_PROJECT':
            const index = state.findIndex(project => project.id === action.id)
            const stateCopy = [...state]
            stateCopy.splice(index, 1)
            return stateCopy
        default:
            return state
    }
}

export {projectsReducer}
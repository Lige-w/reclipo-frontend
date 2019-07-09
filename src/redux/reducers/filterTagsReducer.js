const filterTagsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FILTER_TAGS':
            return action.tags
        default:
            return state
    }
}

export {filterTagsReducer}
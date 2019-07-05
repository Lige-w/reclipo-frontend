const refToEditReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_REF_TO_EDIT":
            return action.reference
        default:
            return state
    }
}

export {refToEditReducer}
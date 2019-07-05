const isShowingRefForm = (state = false, action) => {
    switch(action.type) {
        case 'SET_IS_SHOWING_REF_FORM':
            return action.boolean
        default:
            return state
    }
}

export {isShowingRefForm}
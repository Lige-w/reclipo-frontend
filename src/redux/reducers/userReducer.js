
const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            if(action.user.jwt){localStorage.setItem('token', action.user.jwt)}
            if (action.user){return action.user.user}
        default:
            return state
    }
}

export {userReducer}
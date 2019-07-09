
const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            if(action.user.jwt){localStorage.setItem('token', action.user.jwt)}
            if (action.user.user){return action.user.user}
            return state
        case 'LOGOUT':
            localStorage.removeItem('token')
            return null
        default:
            return state
    }
}

export {userReducer}
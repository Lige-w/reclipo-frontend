import {
    postFetch,
    authGetFetch,
    USERS_URL,
    LOGIN_URL,
    AUTH_URL
} from "../../helpers/fetch";


const registerUser = (body) => (
    dispatch => (
        postFetch(USERS_URL, body)
            .then(user => dispatch(login(user)))
    )
)

const requestAuth = (setIsLoading) => {
    return dispatch => {
        authGetFetch(AUTH_URL).then(user => {
            setIsLoading(false)
            dispatch(login(user))
        })
    }
}

const requestLogin = (body) => {
    return dispatch => {
        postFetch(LOGIN_URL, body)
            .then(user=> dispatch(login(user)))
    }
}



const login = (user) => ({type: 'LOGIN', user })


export {registerUser, requestAuth, requestLogin}

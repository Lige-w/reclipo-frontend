import {postFetch, USERS_URL} from "../../helpers/fetch";


const registerUser = (body) => (
    dispatch => (
        postFetch(USERS_URL, body)
            .then(user => dispatch(login(user)))
    )
)

const login = (user) => ({type: 'LOGIN', user })


export {registerUser}

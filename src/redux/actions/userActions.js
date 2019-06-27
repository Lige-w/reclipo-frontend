import {postFetch, USERS_URL} from "../../helpers/fetch";


const registerUser = (body) => {
    postFetch(USERS_URL, body)
        .then(console.log)
}

export {registerUser}

import {authGetFetch, TAGS_URL} from "../../helpers/fetch";

const requestGetUserTags = () => {
    return dispatch => {
        return authGetFetch(TAGS_URL)
            .then(tags => console.log(tags))
    }
}

export {requestGetUserTags}
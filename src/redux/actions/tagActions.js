import {authGetFetch, TAGS_URL} from "../../helpers/fetch";

const requestGetUserTags = () => {
    return dispatch => {
        return authGetFetch(TAGS_URL)
            .then(tags => dispatch(setTags(tags)))
    }
}

const setFilterTags = (tags) => ({
    type: 'SET_FILTER_TAGS', tags
})

const setTags = (tags) => ({
    type: 'SET_TAGS', tags
})


export {requestGetUserTags, setFilterTags}

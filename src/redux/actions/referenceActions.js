import {authPostFetch, authDeleteFetch, REFERENCES_URL} from "../../helpers/fetch";
import {setCurrentProject} from "./projectActions";

const requestCreateReference = (body) => {
    return dispatch => {
        return authPostFetch(REFERENCES_URL, body)
            .then(project => {
                return dispatch(setCurrentProject(project))
            })
    }
}

const requestDeleteReference = (id) => {
    return dispatch => {
        return authDeleteFetch(REFERENCES_URL + id)
            .then(data => dispatch(deleteReference(id)))
    }
}

const setIsShowingRefForm = (boolean) => ({
    type: 'SET_IS_SHOWING_REF_FORM', boolean
})

const deleteReference = (id) => ({type: "DELETE_REFERENCE", id})

export {requestCreateReference, requestDeleteReference, setIsShowingRefForm}
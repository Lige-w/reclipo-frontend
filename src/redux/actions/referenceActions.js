import {authPostFetch, authDeleteFetch, authPatchFetch, REFERENCES_URL} from "../../helpers/fetch";
import {setCurrentProject} from "./projectActions";

const requestCreateReference = (body) => {
    return dispatch => {
        return authPostFetch(REFERENCES_URL, body)
            .then(project => {
                return dispatch(setCurrentProject(project))
            })
    }
}

const requestEditReference = (body) => {
    return dispatch => {
        return authPatchFetch(REFERENCES_URL + body.reference.id, body)
            .then(project => {
                setRefToEdit(null)
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

const setRefToEdit = (reference) => ({
    type: 'SET_REF_TO_EDIT', reference
})


const deleteReference = (id) => ({type: "DELETE_REFERENCE", id})

export {requestCreateReference, requestEditReference, requestDeleteReference, setIsShowingRefForm, setRefToEdit}
import {authGetFetch ,authPostFetch, authDeleteFetch, authPatchFetch, REFERENCES_URL} from "../../helpers/fetch";

const requestGetUserReferences = (tags) => {
    const queryParams = tags.map(tag => `tag_ids[]=${tag}`).join('&')
    return dispatch => {
        return authGetFetch(`${REFERENCES_URL}?${queryParams}`)
            .then(references => dispatch(setReferences(references)))
    }
}

const requestCreateReference = (body) => {
    return dispatch => {
        return authPostFetch(REFERENCES_URL, body)
            .then(reference => {
                return dispatch(addReference(reference))
            })
    }
}

const requestEditReference = (body) => {
    return dispatch => {
        return authPatchFetch(`${REFERENCES_URL}/${body.reference.id}` , body)
            .then(reference => {
                setRefToEdit(null)
                return dispatch(updateReference(reference))
            })
    }
}

const requestDeleteReference = (id) => {
    return dispatch => {
        return authDeleteFetch(`${REFERENCES_URL}/${id}`)
            .then(data => dispatch(deleteReference(id)))
    }
}

const setReferences = (references) => ({
    type: 'SET_REFERENCES', references
})

const setIsShowingRefForm = (boolean) => ({
    type: 'SET_IS_SHOWING_REF_FORM', boolean
})

const setRefToEdit = (reference) => ({
    type: 'SET_REF_TO_EDIT', reference
})

const addReference = (reference) => ({
    type: 'ADD_REFERENCE', reference
})

const updateReference = reference => ({
    type: 'UPDATE_REFERENCE', reference
})

const deleteReference = (id) => ({type: "DELETE_REFERENCE", id})

export {
    requestGetUserReferences,
    requestCreateReference,
    requestEditReference,
    requestDeleteReference,
    setIsShowingRefForm,
    setRefToEdit,
    setReferences
}
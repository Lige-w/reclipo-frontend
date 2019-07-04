import {authPostFetch, REFERENCES_URL} from "../../helpers/fetch";
import {setCurrentProject} from "./projectActions";

const requestCreateReference = (body) => {
    return dispatch => {
        return authPostFetch(REFERENCES_URL, body)
            .then(project => {
                return dispatch(setCurrentProject(project))
            })
    }
}

export {requestCreateReference}
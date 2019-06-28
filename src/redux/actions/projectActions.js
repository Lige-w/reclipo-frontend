import {PROJECTS_URL, authPostFetch} from "../../helpers/fetch";

const requestCreateProject = (body) => {
    return dispatch => {
        return authPostFetch(PROJECTS_URL, body)
            .then(project => {
                dispatch(addProject(project))
            })
    }
}

const addProject = (project) => {
    return {type: 'ADD_Project', project}
}

export {requestCreateProject}
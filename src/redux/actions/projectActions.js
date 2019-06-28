import {PROJECTS_URL, authPostFetch} from "../../helpers/fetch";

const requestCreateProject = (body) => (
    dispatch => (
        authPostFetch(PROJECTS_URL, body)
        .then(project => dispatch(addProject(project)))
    )
)

const addProject = (project) => {
    debugger
}

export {requestCreateProject}
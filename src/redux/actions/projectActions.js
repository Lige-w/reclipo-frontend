import {PROJECTS_URL, authPostFetch} from "../../helpers/fetch";

const requestCreateProject = (body) => {
    authPostFetch(PROJECTS_URL, body)
        .then(addProject)
}

const addProject = () => {

}

export {requestCreateProject}
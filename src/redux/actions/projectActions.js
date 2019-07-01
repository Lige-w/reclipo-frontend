import {PROJECTS_URL, authPostFetch, authGetFetch} from "../../helpers/fetch";

const requestCreateProject = (body) => {
    return dispatch => {
        return authPostFetch(PROJECTS_URL, body)
            .then(project => {
                dispatch(addProject(project))
            })
    }
}

const requestUserProjects = () => {
    return dispatch => {
        return authGetFetch(PROJECTS_URL)
            .then(projects => dispatch(fetchedProjects(projects)))
    }
}

const requestProjectDetails = (id) => {
    return dispatch => {
        return authGetFetch(`${PROJECTS_URL}/${id}`)
            .then(project => {
                return dispatch(setCurrentProject(project))
            })
    }
}

const fetchedProjects = (projects) => {
    return {type: 'FETCHED_PROJECTS', projects}
}

const addProject = (project) => {
    return {type: 'ADD_PROJECT', project}
}

const setCurrentProject = project => {
    return {type: 'SET_CURRENT_PROJECT', project}
}


export {requestCreateProject, requestUserProjects, requestProjectDetails, setCurrentProject}
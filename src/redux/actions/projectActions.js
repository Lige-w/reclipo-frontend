import {PROJECTS_URL, authPostFetch, authGetFetch, authDeleteFetch} from "../../helpers/fetch";

const requestCreateProject = (body, setIsModalShowing) => {
    return dispatch => {
        return authPostFetch(PROJECTS_URL, body)
            .then(project => {
                setIsModalShowing(false)
                dispatch(addProject(project))
                dispatch(setCurrentProject(project))
            })
    }
}

const requestDeleteProject = (id) => {
    return dispatch => {
        return authDeleteFetch(PROJECTS_URL + id)
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
        return authGetFetch(`${PROJECTS_URL}${id}`)
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


export {
    requestCreateProject,
    requestUserProjects,
    requestProjectDetails,
    setCurrentProject,
    requestDeleteProject
}
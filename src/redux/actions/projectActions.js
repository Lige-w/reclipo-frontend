import {PROJECTS_URL, authPostFetch, authGetFetch, authDeleteFetch} from "../../helpers/fetch";
import {setReferences} from "./referenceActions"

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
                dispatch(setReferences(project.references))
                dispatch(setCurrentProject(project))
            })
    }
}

const requestDeleteProject = (id) => {
    return dispatch => {
        return authDeleteFetch(PROJECTS_URL + id)
            .then(projects => {
                dispatch(fetchedProjects(projects))
                dispatch(unsetCurrentProject(id))
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

const unsetCurrentProject = id => {
    return {type: 'UNSET_CURRENT_PROJECT', id}
}


export {
    requestCreateProject,
    requestUserProjects,
    requestProjectDetails,
    setCurrentProject,
    requestDeleteProject
}
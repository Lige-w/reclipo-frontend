import{combineReducers} from "redux";
import {userReducer} from './userReducer'
import {projectsReducer} from "./projectsReducer";
import {currentProjectReducer} from "./currentProjectReducer";
import {refFormReducer} from "./refFormReducer";

const rootReducer = combineReducers({
    user: userReducer,
    projects: projectsReducer,
    currentProject: currentProjectReducer,
    isShowingRefForm: refFormReducer
})

export default rootReducer
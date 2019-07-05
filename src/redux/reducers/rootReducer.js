import{combineReducers} from "redux";
import {userReducer} from './userReducer'
import {projectsReducer} from "./projectsReducer";
import {currentProjectReducer} from "./currentProjectReducer";
import {isShowingRefForm} from "./isShowingRefForm";
import {refToEditReducer} from "./refToEditReducer";

const rootReducer = combineReducers({
    user: userReducer,
    projects: projectsReducer,
    currentProject: currentProjectReducer,
    isShowingRefForm: isShowingRefForm,
    refToEdit: refToEditReducer
})

export default rootReducer
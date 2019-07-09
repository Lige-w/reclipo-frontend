import{combineReducers} from "redux";
import {userReducer} from './userReducer'
import {projectsReducer} from "./projectsReducer";
import {currentProjectReducer} from "./currentProjectReducer";
import {isShowingRefForm} from "./isShowingRefForm";
import {refToEditReducer} from "./refToEditReducer";
import {referencesReducer} from "./referencesReducer";
import {filterTagsReducer} from "./filterTagsReducer";

const rootReducer = combineReducers({
    user: userReducer,
    projects: projectsReducer,
    currentProject: currentProjectReducer,
    isShowingRefForm: isShowingRefForm,
    refToEdit: refToEditReducer,
    references: referencesReducer,
    filterTags: filterTagsReducer
})

export default rootReducer
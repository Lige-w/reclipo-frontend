import React from 'react'
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import UserReferences from './UserReferences'
import ProjectReferences from './ProjectReferences'
import NewReference from "./ReferencesContainer";

const ReferencesView = ({user: {username}, isShowingRefForm, setIsShowingRefForm}) => {

    return (
        <div id="resources-view">
            <Switch>
                {isShowingRefForm ? <NewReference setIsShowingRefForm={setIsShowingRefForm}/> : null}
                <Route exact path={`/${username}`} component={UserReferences}/>
                <Route exact path={`/${username}/:id`} component={ProjectReferences}/>
            </Switch>
        </div>
    )
}

export default connect(state => ({user: state.user}))(ReferencesView)
import React from 'react'
import {Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import UserResources from './UserResources'
import ProjectResources from './ProjectResources'

const ResourcesView = ({user: {username}}) => {

    return (
        <div id="resources-view">
            <Switch>
                <Route exact path={`/${username}`} component={UserResources}/>
                <Route exact path={`/${username}/:id`} component={ProjectResources}/>
            </Switch>

        </div>
    )
}

export default connect(state => ({user: state.user}))(ResourcesView)
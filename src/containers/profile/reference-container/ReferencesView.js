import React from 'react'
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";

import logo from '../../../assets/books-stack-of-three.svg'

import UserReferences from './UserReferences'
import ProjectReferences from './ProjectReferences'

import '../../../styles/references.css'

const ReferencesView = ({user: {username}, references}) => {
    return (
        <div id="resources-view">
            {!references.length ? <img id='logo' src={logo} /> : null}
            <Switch>
                <Route exact path={`/${username}`} component={UserReferences}/>
                <Route exact path={`/${username}/:id`} component={ProjectReferences}/>
            </Switch>
        </div>
    )
}

export default withRouter(connect(state => ({references: state.references, user: state.user}))(ReferencesView))
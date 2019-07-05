import React from 'react'
import {Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {setIsShowingRefForm} from "../../../redux/actions/referenceActions";

const ReferencesController = ({setIsShowingRefForm, isShowingRefForm}) => {

    return (
        <div id="resources-controller">
            <span onClick={() => setIsShowingRefForm(!isShowingRefForm)}>
                <Icon name='file'/> Add a reference
            </span>
        </div>
    )
}

export default connect(state => ({isShowingRefForm: state.isShowingRefForm}), {setIsShowingRefForm})(ReferencesController)
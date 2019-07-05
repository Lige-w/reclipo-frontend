import React from 'react'
import {Icon} from "semantic-ui-react";
import {connect} from "react-redux";
import {setIsShowingRefForm, setRefToEdit} from "../../../redux/actions/referenceActions";

const ReferencesController = ({setIsShowingRefForm, isShowingRefForm, setRefToEdit}) => {

    return (
        <div id="resources-controller">
            <span onClick={() => {
                setIsShowingRefForm(!isShowingRefForm)
                setRefToEdit(null)
            }}>
                <Icon name='file'/> Add a reference
            </span>
        </div>
    )
}

export default connect(
    state => ({isShowingRefForm: state.isShowingRefForm}),
    {setIsShowingRefForm, setRefToEdit}
    )(ReferencesController)
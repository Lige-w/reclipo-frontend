import React from 'react'
import {connect} from "react-redux";
import {Dropdown, Icon} from "semantic-ui-react";

import {setIsShowingRefForm, setRefToEdit, } from "../../../redux/actions/referenceActions";
import DeleteReferenceModal from "./DeleteReferenceModal";

const ReferenceControls = ({requestDeleteReference, reference, setIsShowingRefForm, setRefToEdit}) => {


    const editReference = () => {
        setIsShowingRefForm(true)
        setRefToEdit(reference)
    }

    return (
        <Dropdown direction='left' icon='setting' className='float-right'>
            <Dropdown.Menu  className='reference-control-menu'>
                <DeleteReferenceModal reference={reference}/>
                <Dropdown.Item onClick={editReference}>
                    <span><Icon name='edit'/> Edit Reference</span>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default connect(
    null,
    {setIsShowingRefForm, setRefToEdit}
    )(ReferenceControls)
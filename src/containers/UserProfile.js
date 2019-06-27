import React from 'react'
import {connect} from "react-redux";

const UserProfile = ({user}) => {
    return (
        <div>

        </div>
    )
}

export default connect(state => ({user: state.user}))(UserProfile)
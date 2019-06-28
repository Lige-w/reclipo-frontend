import React from 'react'

import ResourcesConroller from './ResourcesController'
import ResourcesView from './ResourcesView'

const ResourcesContainer = () => {
    return (
        <div id="resources-container">
            <ResourcesConroller/>
            <ResourcesView/>
        </div>
    )
}

export default ResourcesContainer
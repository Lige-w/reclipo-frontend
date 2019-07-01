import React from 'react'

const Reference = ({reference: {
    title,
    publisher,
    publisher_location: publisherLocation,
    publish_date: publishDate,
    medium,
    reference_type: referenceType,
    url,
    page_numbers: pageNumbers,
    volume_number: volumeNumber,
    issue_number: issueNumber,

}}) => {
    return (
        <div>
            {title}
        </div>
    )
}

export default Reference
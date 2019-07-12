import React from 'react'
import {getApaDate} from "../../../helpers/referenceHelper";

const Citation = ({reference: {
    title,
    publisher,
    publisher_location: publisherLocation,
    publish_date: publishDate,
    medium,
    reference_type: type,
    url,
    page_numbers: pageNumbers,
    volume_number: volumeNumber,
    issue_number: issueNumber,
    authors
}}) => {

    const authorElements = authors.map(({id, first_name, last_name, middle_initial}, i) => {
        if (i === 0) {
            return <span key={id}>{last_name}, {first_name ? `${first_name[0]}. ` : null}{middle_initial ? `${middle_initial}.` : null}</span>
        } else if (i === authors.length - 1) {
            return <span key={id}> & {last_name}, {first_name ? `${first_name[0]}. ` : null}{middle_initial ? `${middle_initial}.` : null}</span>
        } else if (i > 6) {
            return null
        } else if (i === 6) {
            return <span> ...</span>
        } else {
            return <span key={id}>, {last_name}, {first_name ? `${first_name[0]}. ` : null}{middle_initial ? `${middle_initial}.` : null}</span>
        }
    })

    switch (medium) {
        case 'Book':
            return (
                <span>
                    {authorElements}
                    {publishDate? ` (${publishDate.split('-')[0]}). ` : null}
                    <em>{title}.</em>
                    {publisher? ` ${publisherLocation}: ${publisher}.` : null}
                    {url? ` Retrieved from ${url}` : null}
                </span>
            )
        case 'Web Page':
            if (authors.length) {
                return (
                    <span>
                    {authorElements}
                        {publishDate ? ` (${getApaDate(publishDate)}). ` : null}
                        {title}.
                        {url ? ` Retrieved from ${url}` : null}
                    </span>
                )
            } else {
                return (
                    <span>
                        {title}.
                        {publishDate ? ` (${getApaDate(publishDate)}). ` : null}
                        {url ? ` Retrieved from ${url}` : null}
                    </span>
                )
            }
        case 'Journal':
            return (
                <span>
                    {authorElements}
                    {publishDate? ` (${publishDate.split('-')[0]}). ` : null}
                    {title}. <em>{publisher}</em>
                    {volumeNumber? `, ${volumeNumber}(${issueNumber})` : null}
                    {pageNumbers ? `, ${pageNumbers}` : null}
                    {url? `. Retrieved from ${url}` : null}
                </span>
            )
        default:
            return (
                <span>
                    {authorElements}
                    {publishDate? ` (${publishDate.split('-')[0]}). ` : null}
                    <em>{title}.</em>
                    {publisher? ` ${publisherLocation}: ${publisher}.` : null}
                    {url? ` Retrieved from ${url}` : null}
                </span>
            )
    }
}


export default Citation
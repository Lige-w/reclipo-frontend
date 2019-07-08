const referenceTypes = [
    'Print',
    'Online',
    'Other'
]

const printReferenceMedia = [
    'Book',
    'Newspaper',
    'Journal',
    'Magazine'
]

const onlineReferenceMedia = [
    'Web Page',
    'Journal',
    'Newspaper',
    'Audio',
    'Video',
    'E-Book'
]

const otherReferenceMedia = [
    'Film',
    'Audio',
    'Television',
    'Other'
]

const months = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
}

const getApaDate = (publishDate) => {
    const dateArr = publishDate.split('-')
    return `${dateArr[0]}, ${months[dateArr[1]]} ${dateArr[2]}`
}

export {referenceTypes, printReferenceMedia, onlineReferenceMedia, otherReferenceMedia, getApaDate}
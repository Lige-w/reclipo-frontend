import React from "react";

const headerOptions = [
    {
        key: 'h1',
        value: 'header-one',
        text: <h1>Title</h1>
    },
    {
        key: 'h2',
        value: 'header-two',
        text: <h2>Sub-Title</h2>
    },
    {
        key: 'h3',
        value: 'header-three',
        text: <h3>Section Header</h3>
    },
    {
        key: 'h4',
        value: 'header-four',
        text: <h4>Section Sub-Header</h4>
    },
    {
        key: 'unstyled',
        value: 'unstyled',
        text: 'none'
    }
]


const styleMap = {
    'HIGHLIGHT': {
        backgroundColor: 'yellow'
    }
}


export {headerOptions, styleMap}
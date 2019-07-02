import React, {Component} from 'react'
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js'

class NoteEditor extends Component {
    constructor(props) {
        super(props)

        const {note: {content}} = props

        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    onChange = (editorState) => {
        this.setState({editorState})
    }

    render() {
        const {note: {id, name, content} } = this.props
        const {editorState} = this.state
        return (
            <div>
                <Editor
                    editorState={editorState}
                    onChange={this.onChange}
                    // blockRendererFn={}
                    // blockStyleFn={}
                    // keyBindingFn={}
                    readOnly={false}
                    spellCheck={true}
                    stripPastedStyles={false}
                    // blockRenderMap={}
                />
            </div>
        )
    }

}

export default NoteEditor
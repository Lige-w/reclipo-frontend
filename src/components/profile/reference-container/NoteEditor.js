import React, {Component} from 'react'
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js'

class NoteEditor extends Component {
    constructor(props) {
        super(props)



        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    componentDidMount() {
        if (this.props.content) {
            const editorContent = convertFromRaw(JSON.parse(this.props.content))
            this.setState({
                editorState: EditorState.createWithContent(editorContent)
            })
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
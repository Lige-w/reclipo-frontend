import React, {Component} from 'react'
import {connect} from "react-redux";
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import {Icon, Button} from "semantic-ui-react";

import {updateNoteContent} from "../../../redux/actions/noteActions";

import {authPatchFetch, NOTES_URL} from "../../../helpers/fetch";

class NoteEditor extends Component {
    constructor(props) {
        super(props)



        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    componentDidMount() {
        console.log('mounted')
        if (this.props.note.content && this.props.note.content !== 'null') {
            const editorContent = convertFromRaw(JSON.parse(this.props.note.content))
            this.setState({
                editorState: EditorState.createWithContent(editorContent)
            })
        }
    }

    componentDidUpdate(prevProps) {
        const {note:{content}} = this.props
        if (content !== prevProps.note.content) {
            if (content) {
                const editorContent = convertFromRaw(JSON.parse(content))
                this.setState({
                    editorState: EditorState.createWithContent(editorContent)
                })
            } else {
                this.setState({editorState: EditorState.createEmpty()})
            }
        }
    }

    onChange = (editorState) => {
        const {note, updateNoteContent} = this.props
        this.setState({editorState})

        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        updateNoteContent({...note, content})
    }

    saveNote = () => {
        const {note} = this.props
        if (note.content) {
            authPatchFetch(NOTES_URL + note.id, {note: {name: note.name, content: note.content}})
        }
    }


    render() {
        const {note: {id, name, content} } = this.props
        const {editorState} = this.state
        return (
            <div>
                <div className='editor-toolbar'><Button onClick={this.saveNote}><Icon name='save outline' size='large'/></Button></div>
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

export default connect(null, {updateNoteContent})(NoteEditor)
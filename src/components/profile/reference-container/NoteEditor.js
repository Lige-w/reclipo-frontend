import React, {Component} from 'react'
import {connect} from "react-redux";
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import {Icon, Button} from "semantic-ui-react";

import {updateNoteContent, requestDeleteNote} from "../../../redux/actions/noteActions";

import {authPatchFetch, NOTES_URL} from "../../../helpers/fetch";

class NoteEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    componentDidMount() {
        const {content} = this.props.note
        if (content && content !== 'null') {
            const editorContent = convertFromRaw(JSON.parse(content))
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

    deleteNote = () => {
        const {note, requestDeleteNote} = this.props
        requestDeleteNote(note)
    }


    render() {
        const {note: {id, name, content} } = this.props
        const {editorState} = this.state
        return (
            <div>
                <div className='editor-toolbar'>
                    <Button.Group>
                    <Button onClick={this.saveNote} icon='save outline'/>
                    <Button  onClick={this.deleteNote} icon='trash'/>
                    </Button.Group>
                </div>
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

export default connect(null, {updateNoteContent, requestDeleteNote})(NoteEditor)
import React, {Component} from 'react'
import {connect} from "react-redux";
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js'
import {Icon, Button, Dropdown, Label} from "semantic-ui-react";
import 'draft-js/dist/Draft.css'

import {updateNoteContent, requestDeleteNote} from "../../../redux/actions/noteActions";
import {authPatchFetch, NOTES_URL} from "../../../helpers/fetch";
import {headerOptions} from "../../../helpers/editorData";

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

    onTab = (e) => {
        e.preventDefault()
        const newState = RichUtils.onTab(e, this.state.editorState, 4)
        if (newState) {
            this.onChange(newState)
            return 'handled'
        } else {
            return 'not-handled'
        }
    }

    handleReturn = e => {

    }

    handleKeyCommand = command => {
        const {editorState} = this.state
        const newState = RichUtils.handleKeyCommand(editorState, command)
        if (newState) {
            this.onChange(newState)
            return 'handled'
        } else {
            return 'not-handled'
        }
    }

    setStyle = (style) => {
        this.editor.focus()
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
    }

    setBlockType = (type) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, type))
    }

    render() {
        const {note: {id, name, content} } = this.props
        const {editorState} = this.state
        return (
            <div>
                <div className='editor-toolbar'>
                    <Dropdown onChange={(e, {value}) => this.setBlockType(value)} defaultValue='unstyled' options={headerOptions} />
                    <Button.Group>
                        <Button onClick={() => this.setStyle("BOLD")} icon='bold' />
                        <Button onClick={() => this.setStyle("ITALIC")} icon='italic' />
                        <Button onClick={() => this.setStyle("UNDERLINE")} icon='underline' />
                    </Button.Group>
                    <Button.Group>
                        <Button onClick={() => this.setBlockType("unordered-list-item")} icon='list ul'/>
                        <Button onClick={() => this.setBlockType('ordered-list-item')} icon='list ol'/>
                    </Button.Group>
                    <Button.Group>
                        <Button onClick={this.saveNote} icon='save outline'/>
                        <Button  onClick={this.deleteNote} icon='trash'/>
                    </Button.Group>
                </div>
                <Editor
                    editorState={editorState}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
                    // blockRendererFn={myBlockRendererFn}
                    // blockStyleFn={}
                    // keyBindingFn={}
                    handleReturn={this.handleReturn}
                    readOnly={false}
                    // spellCheck={true}
                    stripPastedStyles={false}
                    // blockRenderMap={}
                    onTab={this.onTab}
                    ref={(editor) => { this.editor = editor; }}
                />
            </div>
        )
    }

}

export default connect(null, {updateNoteContent, requestDeleteNote})(NoteEditor)
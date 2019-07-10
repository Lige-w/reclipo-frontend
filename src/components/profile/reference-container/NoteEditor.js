import React, {Component} from 'react'
import {connect} from "react-redux";
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js'
import {Button, Dropdown, Icon, Menu} from "semantic-ui-react";
import 'draft-js/dist/Draft.css'

import {updateNoteContent, requestUpdateNoteContent} from "../../../redux/actions/noteActions";
import {headerOptions, styleMap} from "../../../helpers/editorData";

import DeleteNoteModal from './DeleteNoteModal'
import RenameNoteModal from './RenameNoteModal'

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
        const {note, requestUpdateNoteContent} = this.props
        if (note.content) {
            requestUpdateNoteContent(note)
        }
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
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
    }

    setBlockType = (type) => {
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, type))
    }

    saveTime = () => {
        const {updated_at} = this.props.note

        const seconds = (Date.now() - Date.parse(updated_at)) / 1000

        if (seconds < 60) {return 'less than a minute'}
        const minutes = Math.round(seconds / 60)
            if (minutes < 60) {return (minutes) + ' minutes'}
        const hours = Math.round(minutes / 60)
         if (hours < 24) {return (hours) + ' hours'}
        const days = Math.round(hours / 24)
        return days + ' days'
    }

    render() {
        const {editorState} = this.state
        const {name, note} = this.props
        return (
            <div>
                <Menu className='editor-toolbar'>
                    <Dropdown
                        text='Header'
                        item
                        onChange={(e, {value}) => this.setBlockType(value)}
                        options={headerOptions}
                    />
                    <Menu.Item>
                        <Button.Group>
                            <Button onClick={() => this.setStyle("BOLD")} icon='bold' />
                            <Button onClick={() => this.setStyle("ITALIC")} icon='italic' />
                            <Button onClick={() => this.setStyle("UNDERLINE")} icon='underline' />
                            <Button onClick={() => this.setStyle("HIGHLIGHT")} icon='h square'/>
                        </Button.Group>
                    </Menu.Item>
                    <Menu.Item>
                        <Button.Group>
                            <Button onClick={() => this.setBlockType("unordered-list-item")} icon='list ul'/>
                            <Button onClick={() => this.setBlockType('ordered-list-item')} icon='list ol'/>
                        </Button.Group>
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Button.Group>
                            <RenameNoteModal note={note} name={name} />
                            <Button onClick={this.saveNote} icon='save outline'/>
                            <DeleteNoteModal note={note} name={name} />
                        </Button.Group>
                    </Menu.Item>
                </Menu>
                <div onClick={() => this.editor.focus()} className="editor-container">
                    <Editor
                        editorState={editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        customStyleMap={styleMap}
                        // blockRendererFn={myBlockRendererFn}
                        // blockStyleFn={}
                        // keyBindingFn={}
                        // handleReturn={this.handleReturn}
                        readOnly={false}
                        // spellCheck={true}
                        stripPastedStyles={false}
                        // blockRenderMap={}
                        onTab={this.onTab}
                        ref={(editor) => { this.editor = editor; }}
                    />
                </div>
                <span className='save-time float-right'>Last saved {this.saveTime()} ago.</span>
            </div>
        )
    }

}

export default connect(null, {updateNoteContent, requestUpdateNoteContent})(NoteEditor)
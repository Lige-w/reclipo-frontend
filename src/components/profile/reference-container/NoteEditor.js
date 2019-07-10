import React, {Component} from 'react'
import {connect} from "react-redux";
import {Editor, EditorState, RichUtils, convertToRaw, convertFromRaw} from 'draft-js'
import {Button, Dropdown, Icon, Menu} from "semantic-ui-react";
import 'draft-js/dist/Draft.css'

import createStyles from 'draft-js-custom-styles'

import {updateNoteContent, requestUpdateNoteContent} from "../../../redux/actions/noteActions";
import {headerOptions, styleMap} from "../../../helpers/editorData";

import DeleteNoteModal from './DeleteNoteModal'
import RenameNoteModal from './RenameNoteModal'

const {styles, customStyleFn} = createStyles(['font-size'], 'CUSTOM_', styleMap)

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

    saveNote = () => {
        const {note, requestUpdateNoteContent} = this.props
        if (note.content) {
            requestUpdateNoteContent(note)
        }
    }

    lastSaved = () => {
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


    onChange = (editorState) => {
        const {note, updateNoteContent} = this.props
        this.setState({editorState})
        const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        updateNoteContent({...note, content})
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

    setStyle = (e, style) => {
        e.preventDefault()
        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style))
    }

    setBlockType = (e, type) => {
        e.preventDefault()
        this.onChange(RichUtils.toggleBlockType(this.state.editorState, type))
    }

    toggleFontSize = (e, size) => {
        e.preventDefault()
        this.onChange(styles.fontSize.toggle(this.state.editorState, size))
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
                        onChange={(e, {value}) => {
                            e.preventDefault()
                            this.setBlockType(value)}}
                        options={headerOptions}
                    />
                    <Menu.Item>
                        <Button.Group>
                            <Button onMouseDown={(e) => {this.setStyle(e, "BOLD")
                            }} icon='bold' />
                            <Button onMouseDown={(e) => {this.setStyle(e, "ITALIC")}} icon='italic' />
                            <Button onMouseDown={(e) => {this.setStyle(e, "UNDERLINE")}} icon='underline' />
                            <Button onMouseDown={(e) => {this.setStyle(e, "HIGHLIGHT")}} icon='h square'/>
                        </Button.Group>
                    </Menu.Item>
                    <Menu.Item>
                        <Dropdown text='Font Size' onMouseDown={e => e.preventDefault()}>
                            <Dropdown.Menu>
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '8px')} text='8' />
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '10px')} text='10' />
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '12px')} text='12' />
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '14px')} text='14' />
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '16px')} text='16' />
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '18px')} text='18' />
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '20px')} text='20' />
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '24px')} text='24' />
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '28px')} text='28' />
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '32px')} text='32' />
                                <Dropdown.Item onMouseDown={e => this.toggleFontSize(e, '38px')} text='38' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                    <Menu.Item>
                        <Button.Group>
                            <Button onMouseDown={(e) => {this.setBlockType(e, "unordered-list-item")}} icon='list ul'/>
                            <Button onMouseDown={(e) => {this.setBlockType(e, 'ordered-list-item')}} icon='list ol'/>
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
                        customStyleFn={customStyleFn}
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
                <span className='save-time float-right'>Last saved {this.lastSaved()} ago.</span>
            </div>
        )
    }

}

export default connect(null, {updateNoteContent, requestUpdateNoteContent})(NoteEditor)
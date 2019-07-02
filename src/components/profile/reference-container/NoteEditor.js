import React, {Component} from 'react'
import {connect} from "react-redux";
import {Editor, EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import {updateNoteContent} from "../../../redux/actions/noteActions";

class NoteEditor extends Component {
    constructor(props) {
        super(props)



        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    componentDidMount() {
        console.log('mounted')
        if (this.props.note.content) {
            const editorContent = convertFromRaw(this.props.note.content)
            this.setState({
                editorState: EditorState.createWithContent(editorContent)
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.note.content !== prevProps.note.content) {
            if (this.props.note.content) {
        console.log(this.props.note.content)
                const editorContent = convertFromRaw(this.props.note.content)

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

            const content = convertToRaw(editorState.getCurrentContent())
            updateNoteContent({...note, content})
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

    export default connect(null, {updateNoteContent})(NoteEditor)
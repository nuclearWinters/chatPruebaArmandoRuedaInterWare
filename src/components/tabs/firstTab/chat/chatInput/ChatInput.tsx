import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faGrinAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import yo from "../../../../../imgs/CARLOS.png"
import "./ChatInput.css"
import { connect } from 'react-redux'
import { createPost } from "../../../../../actions/postActions"

type StateChatInput = {
    newMessage: string
}

type PropsChatInput = {
    createPost: Function
}

class ChatInput extends Component<PropsChatInput, StateChatInput> {
    constructor(props: PropsChatInput) {
        super(props);
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            newMessage: ""
        }
    }

    onSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && this.state.newMessage !== "") {
            this.props.createPost(this.state.newMessage)
            this.setState({
                newMessage: ""
            })
        }
    }

    onChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({newMessage: e.currentTarget.value})
    }

    render() {
        return (
            <div className="chatInputFixed" >
                <img alt="" className="imageChatInputFixed" src={yo} width={36} height={36} />
                <div className="inputOfChatFixedBox" >
                    <input value={this.state.newMessage} type="text" onKeyDown={this.onSubmit} onChange={this.onChange} className="inputOfChatFixed" placeholder="Escribe un comentario"/>
                </div>
                <FontAwesomeIcon color="#797979" icon={faPaperclip} className="iconChatInputFixedFirst"/>
                <FontAwesomeIcon color="#797979" icon={faGrinAlt} className="iconChatInputFixed"/>
                <FontAwesomeIcon color="#797979" icon={faPaperPlane} className="iconChatInputFixedLast"/>
            </div>
        )
    }
}

export default connect(null, { createPost })(ChatInput)
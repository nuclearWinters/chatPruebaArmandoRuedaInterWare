import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faSearch, faStar, faCommentDots, faLink, faFile } from '@fortawesome/free-solid-svg-icons'
import him from "../../../../../imgs/ANGELA.jpg"
import "./ChatHeader.css"
import { toggle } from "../../../../../actions/toggleMenuActions"
import { connect } from 'react-redux'

type PropsChatHeader = {
    toggle: Function
}

class ChatHeader extends Component<PropsChatHeader, {}> {
    render() {
        return (
            <div className="chatHeader">
                <img alt="" className="image" src={him} width={36} height={36} />
                <div className="profileName" >
                    <div>
                        Belle Delphine
                    </div>
                    <div className="profileStatus" >
                        <FontAwesomeIcon color="#797979" icon={faStar} size="xs" className="icon"/>
                        <div className="circle"></div>
                        <div className="chatFont status">Online</div>
                        <FontAwesomeIcon color="#797979" icon={faHome} size="xs"/>
                        <div className="chatFont option">
                            <div className="entry">
                                <div className="entry__inner">
                                      <span className="entry__text">{` \(★ω★)/ YOU  (*≧ω≦*) ARE  ☆ ～('▽^人)  THE  ヽ(>∀<☆)ノ  BEST  (╯✧▽✧)╯`}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="inputChatHeader">
                    <input className="chatInput" placeholder="Search lewd polaroid"/>
                    <FontAwesomeIcon color="#797979" icon={faSearch} className="iconSearch" />
                </div>
                <div className="inputChatHeaderBoxFirst">
                    <div className="inputChatHeaderBoxSelected">
                        <FontAwesomeIcon color="#49a9ea" icon={faCommentDots} className="iconSelected"/>
                        <div className="chatFont selected">Chat</div>
                    </div>
                </div>
                <div className="inputChatHeaderBox">
                    <FontAwesomeIcon color="#797979" icon={faFile} className="iconChatHeader"/>
                    <div className="chatFont">Archivos</div>
                </div>
                <div className="inputChatHeaderBoxLast">
                    <FontAwesomeIcon color="#797979" icon={faLink} className="iconChatHeader"/>
                    <div className="chatFont">Links</div>
                </div>
                <div className="burgerIcon" onClick={() => this.props.toggle()}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    }
}

export default connect(null, { toggle })(ChatHeader)
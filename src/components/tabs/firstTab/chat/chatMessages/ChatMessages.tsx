import React, { Component } from 'react'
import yo from "../../../../../imgs/CARLOS.png"
import him from "../../../../../imgs/ANGELA.jpg"
import gg3 from "../../../../../imgs/gg3Good.jpg"
import "./ChatMessages.css"
import moment from "moment"
import "moment/locale/es"

type MessageChat = {
    user: {
        name: string,
        username: string,
        id: number
    },
    receiver_id: number, 
    message: string,
    date?: Date
}

type PropsChat = {
    posts: MessageChat[]
}

export default class ChatMessages extends Component<PropsChat, {}> {
    private messageEnd = React.createRef<HTMLDivElement>()
    scrollToBottom = () => {
        const node = this.messageEnd.current
        if (node) node.scrollIntoView(false);
    }
    componentDidUpdate() {
        this.scrollToBottom()
    }
    render() {
        return (
            <div className="chatMessages" >
                <div className="chatMessagePaddingBox">
                    {this.props.posts.map((res: MessageChat, i: number) => 
                    <div key={i} className="messageBox" >
                        {i === 6 ?
                        <div className="divider">
                            <div className="dividerLine"></div>
                            <div className="dividerDate">{moment().locale("es").format('dddd, D [de] MMMM')}</div>
                        </div>
                        : null}
                        <div className="messageData" >
                            <img alt="" className="messageImage" src={res.user.id === 1 ? yo : res.user.id === 2 ? him : gg3} width={28} height={28}/>
                            <div className="messageUser">{res.user.name === "Bender" ? "#1 Loser" : res.user.name === "Pickle Rick" ? "Belle Delphine" : ""}</div>
                            {res.date ? <div className="messageDate">{moment().format('D MMM - h:mm A')}</div> : <div className="messageDate">5 Nov - 1:37 PM</div>}
                        </div>
                        <div className="messageMessage" >{res.message}</div>
                    </div>
                    )}
                    <div style={{ float:"left", clear: "both" }}
                        ref={this.messageEnd}>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import yo from "../../../../../imgs/CARLOS.png"
import him from "../../../../../imgs/ANGELA.jpg"
import "./ChatMessages.css"
import moment from "moment"

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
    constructor(props: PropsChat) {
        super(props)
        this.messageEnd = null;
    }
    public messageEnd: HTMLDivElement | null;
    scrollToBottom = () => {
        if (this.messageEnd) this.messageEnd.scrollIntoView(false);
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
                                <img alt="" className="messageImage" src={res.user.id === 1 ? yo : him} width={28} height={28}/>
                                <div className="messageUser">{res.user.name === "Bender" ? "#1 Loser" : "Belle Delphine"}</div>
                                {res.date ? <div className="messageDate">{moment().format('D MMM - h:mm A')}</div>  : <div className="messageDate">5 Nov - 1:37 PM</div>}
                            </div>
                            <div className="messageMessage" >{res.message}</div>
                        </div>
                    )}
                    <div style={{ float:"left", clear: "both" }}
                        ref={el => { this.messageEnd = el; }}>
                    </div>
                </div>
            </div>
        )
    }
}

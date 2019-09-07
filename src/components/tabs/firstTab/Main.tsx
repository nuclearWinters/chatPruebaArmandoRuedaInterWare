import React, { Component } from 'react'
import MenuLogo from "./menu/menuLogo/MenuLogo"
import MenuOptions from "./menu/menuOption/MenuOptions"
import MenuInput from "./menu/menuInput/MenuInput"
import MenuCanales from "./menu/menuCanales/MenuCanales"
import ChatHeader from "./chat/chatHeader/ChatHeader"
import ChatMessages from "./chat/chatMessages/ChatMessages"
import ChatInput from "./chat/chatInput/ChatInput"
import MenuUsuariosYCanales from "./menu/menuUsuariosYCanales/MenuUsuariosYCanales"
import "./Main.css"
import { connect } from "react-redux"
import { fetchPosts, cleanPost } from "../../../actions/postActions"

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
    newPost: MessageChat | null
    posts: MessageChat[],
    fetchPosts: Function,
    toggle: boolean
    cleanPost: Function
}

export class Main extends Component<PropsChat, {}> {
    UNSAFE_componentWillReceiveProps(nextProps: PropsChat) {
        if (nextProps.newPost) {
            this.props.posts.push(nextProps.newPost)
            this.props.cleanPost()
        }
    }
    componentDidMount() {
        this.props.fetchPosts()
    }
    render() {
        return (
            <div className="dashboard">
                <div className={this.props.toggle ? "menu open" : "menu"}>
                    <MenuLogo/>
                    <MenuOptions/>
                    <MenuInput/>
                    <MenuUsuariosYCanales title="Favoritos" usuarios={
                        [
                            {tipo: "persona", nombre: "#1 Loser - (Tú)", estado: "online", usuario: 1},
                            {tipo: "persona", nombre: "Belle Delphine", estado: "offline", usuario: 0, isSelected: true},
                            {tipo: "canal", nombre: "Canal", estado: "brb"}
                        ]
                    }/>
                    <MenuUsuariosYCanales title="Recientes" usuarios={
                        [
                            {tipo: "persona", nombre: "#1 Loser - (Tú)", estado: "online", usuario: 1},
                            {tipo: "persona", nombre: "Belle Delphine", estado: "brb", usuario: 0},
                            {tipo: "canal", nombre: "Canal", estado: "offline"},
                            {tipo: "persona", nombre: "NyanNyanCoplay", estado: "online", usuario: 2},
                            {tipo: "canal", nombre: "Canal", estado: "offline"}
                        ]
                    }/>
                    <MenuCanales title="Canales" canales={["Canal", "Canal", "Canal", "Canal", "Canal"]}/>
                    <MenuUsuariosYCanales title="Recientes" usuarios={
                        [
                            {tipo: "persona", nombre: "Belle Delphine", estado: "online", usuario: 0},
                            {tipo: "persona", nombre: "NyanNyanCoplay", estado: "brb", usuario: 2},
                            {tipo: "persona", nombre: "lucifersexdoll", estado: "offline", usuario: 3},
                            {tipo: "persona", nombre: "corleen", estado: "online", usuario: 4},
                            {tipo: "persona", nombre: "zureeal", estado: "offline", usuario: 5}
                        ]
                    }/>
                </div>
                <div className="chat">
                    <ChatHeader/>
                    <ChatMessages posts={this.props.posts}/>
                    <ChatInput/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: {posts: {items: MessageChat[], item: MessageChat}, toggle: boolean}) => ({
    posts: state.posts.items,
    newPost: state.posts.item,
    toggle: state.toggle
})

export default connect(mapStateToProps, { fetchPosts, cleanPost })(Main)
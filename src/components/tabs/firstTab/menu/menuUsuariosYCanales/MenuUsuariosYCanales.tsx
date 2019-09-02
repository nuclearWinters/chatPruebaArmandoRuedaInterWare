import React, { Component } from 'react'
import yo from "../../../../../imgs/CARLOS.png"
import him from "../../../../../imgs/ANGELA.png"
import "./MenuUsuariosYCanales.css"

type PropsUsuarios = {
    title: string,
    usuarios: {
        nombre: string,
        tipo: string,
        estado: string,
        usuario?: number
    }[]
}

export default class MenuUsuariosYCanales extends Component<PropsUsuarios, {}> {
    render() {
        return (
            <div className="menuUsuariosYCanales">
                <div className="title">{this.props.title}</div>
                {this.props.usuarios.map((user, i) => {
                    if (user.tipo === "persona") {
                        return(
                            <div key={i} className="canalBox">
                                {user.estado === "online" ? <div className="online"></div> : user.estado === "offline" ? <div className="offline"></div> : <div className="brb"><div></div></div>}
                                <img alt="" className="image" src={user.usuario ? yo : him} width={24} height={24}/>
                                <div className="nombre">{user.nombre}</div>
                            </div>
                        )
                    } else {
                        return(
                            <div key={i} className="canalBox">
                                {user.estado === "online" ? <div className="online"></div> : user.estado === "offline" ? <div className="offline"></div> : <div className="brb"><div></div></div>}
                                <div className="sharp">#</div>
                                <div className="nombre"><div>{user.nombre}</div></div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}

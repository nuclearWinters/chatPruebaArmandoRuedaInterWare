import React, { Component } from 'react'
import yo from "../../../../../imgs/CARLOS.png"
import him from "../../../../../imgs/ANGELA.jpg"
import gg2 from "../../../../../imgs/gg2Good.jpg"
import gg3 from "../../../../../imgs/gg3Good.jpg"
import gg4 from "../../../../../imgs/gg4Good.jpeg"
import gg5 from "../../../../../imgs/gg5.jpeg"
import "./MenuUsuariosYCanales.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons'

type PropsUsuarios = {
    title: string,
    usuarios: {
        nombre: string,
        tipo: string,
        estado: string,
        usuario?: number,
        isSelected?: boolean
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
                            <div key={i} className="canalBox" style={user.isSelected ? {backgroundColor: "#ffffff"}: {}}>
                                {user.estado === "online" ? <div className="online"></div> : user.estado === "offline" ? <div className="offline"></div> : <div className="brb"><div></div></div>}
                                <img alt="" className="image" src={
                                    (() => {
                                        switch(user.usuario) {
                                          case 0: return him;
                                          case 1: return yo;
                                          case 2: return gg2;
                                          case 3: return gg3;
                                          case 4: return gg5;
                                          case 5: return gg4;
                                          default: return him
                                        }
                                    })()} width={24} height={24}/>
                                <div className="nombre" style={user.isSelected ? {color: "#172135", fontWeight: 400}: {}}>{user.nombre}</div>
                                {user.isSelected && <FontAwesomeIcon color="#797979" icon={faEllipsisH} size="xs" style={{margin: "0px 5px", width: 30, height: 20}}/>}
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

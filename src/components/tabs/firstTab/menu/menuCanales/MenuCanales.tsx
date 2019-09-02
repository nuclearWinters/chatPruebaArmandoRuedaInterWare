import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import "./MenuCanales.css"

type PropsCanales = {
    title: string,
    canales: string[]
}

export default class menuCanales extends Component<PropsCanales, {}> {
    render() {
        return (
            <div className="menuCanales">
                <div className="title">{this.props.title} <FontAwesomeIcon color="#cccccc" icon={faChevronDown} size="sm" style={{marginLeft: 5}}/></div>
                {this.props.canales.map((ca, i) => 
                    <div key={i} className="canalBox">
                        <div className="sharp">#</div>
                        <div className="nombre"><div>{ca}</div></div>
                    </div>
                )}
            </div>
        )
    }
}

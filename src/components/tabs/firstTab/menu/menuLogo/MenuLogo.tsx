import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import "./MenuLogo.css"
import logo from "../../../../../imgs/logoGood.png"


export default class MenuLogo extends Component {
    render() {
        return (
            <div className="menuLogo">
                <div className="image"><img alt="" src={logo} width={80} height={80} className="imageProfile"/></div>
                <div className="menuButton">
                    <FontAwesomeIcon color="#cccccc" icon={faChevronLeft} size="xs" style={{margin: "0px 5px"}}/>
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        )
    }
}


import React, { Component } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./MenuInput.css"

export default class MenuInput extends Component {
    render() {
        return (
            <div className="menuInput">
                <div>
                    <input placeholder="Busca personas y canales"/>
                    <div>
                        <FontAwesomeIcon color="#797979" icon={faSearch} size="1x"/>
                    </div>
                </div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import "./MenuOptions.css"

export default class MenuOptions extends Component {
    render() {
        return (
            <div className="menuOptions">
                <div className="boxFlex">
                    <div className="switch">
                        <div className="switchFlex">
                            <div className="circle"></div>
                        </div>
                        <div className="switchFlex">
                            <FontAwesomeIcon color="#cccccc" icon={faCaretDown} size="1x"/>
                        </div>
                    </div>
                    <div className="dropdown">
                        <div className="iconBox">
                            <FontAwesomeIcon color="#cccccc" icon={faHome} size="1x"/>
                        </div>
                        <div className="inputBox">
                            <div className="entry">
                                <div className="entry__inner">
                                    <span className="entry__text">Trabajando remoto</span>
                                </div>
                            </div>
                        </div>
                        <div className="inputIconBox">
                            <FontAwesomeIcon color="#cccccc" icon={faCaretDown} size="1x"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

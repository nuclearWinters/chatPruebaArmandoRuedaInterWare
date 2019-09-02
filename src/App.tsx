import React from 'react';
import './App.css';
import MainClass from "./components/tabs/firstTab/Main"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faRocket, faTrophy } from '@fortawesome/free-solid-svg-icons'
import yo from "./imgs/CARLOS.png"
import { Provider } from "react-redux"
import store from "./store"

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <div className="header">
          <div className="tab first">Lorem</div>
          <div className="tab">Ipsum</div>
          <div className="title">
            <div className="entry">
              <div className="entry__inner">
                  <span className="entry__text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</span>
              </div>
            </div>
          </div>
          <div className="iconBox"><FontAwesomeIcon color="#f7f8f9" icon={faRocket} /></div>
          <div className="iconBox"><FontAwesomeIcon color="#f7f8f9" icon={faTrophy} /></div>
          <div className="iconBox"><FontAwesomeIcon color="#f7f8f9" icon={faUsers} /></div>
          <img alt="" src={yo} width={28} height={28} className="imageProfile"/>
        </div>
        <MainClass />
      </div>
    </Provider>
  );
}

export default App;

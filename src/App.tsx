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
          <div className="tab first">{`(◕‿◕)♡`}</div>
          <div className="tab">{`<3 (ﾉ◕ヮ◕)ﾉ`}</div>
          <div className="title">
            <div className="entry">
              <div className="entry__inner">
                  <span className="entry__text">{`You are my god, I couldn't possibly ever thank you enough. <3  I couldn't possibly think of a good enough reward for the very best Patron I will ever have. <3 If you achieve this tier, please private message me. I'm not sure what reward I could give you, but we'll talk about it. I love you.`}</span>
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

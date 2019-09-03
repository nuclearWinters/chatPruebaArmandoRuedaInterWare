import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import ChatMessages from './components/tabs/firstTab/chat/chatMessages/ChatMessages';
import ChatHeader from './components/tabs/firstTab/chat/chatHeader/ChatHeader';
import ChatInput from './components/tabs/firstTab/chat/chatInput/ChatInput';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
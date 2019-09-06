import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { rootReducer } from './reducers'
import postReducer from "./reducers/postReducer"
import toggleReducer from "./reducers/toggleReducer"
import * as types from './actions/types'

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ChatMessage from "./components/tabs/firstTab/chat/chatMessages/ChatMessages"

Enzyme.configure({ adapter: new Adapter() })

function setup() {
  const props = {
    posts: [{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Consectetur adipiscing elit."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Incididunt ut labore et dolore magna."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"¡Hola!","date": new Date()}]
  }

  const enzymeWrapper = shallow(<ChatMessage {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('ChatMessages', () => {
    it('se renderiza correctamente', () => {
      const { enzymeWrapper } = setup()

      expect(enzymeWrapper.find('div').first().hasClass('chatMessages')).toBe(true)
      expect(enzymeWrapper.find('div').at(1).hasClass('chatMessagePaddingBox')).toBe(true)
      expect(enzymeWrapper.find('div').at(1).children()).toHaveLength(8)


      /*expect(enzymeWrapper.find('h1').text()).toBe('todos')

      const todoInputProps = enzymeWrapper.find('TodoTextInput').props()
      expect(todoInputProps.newTodo).toBe(true)
      expect(todoInputProps.placeholder).toEqual('What needs to be done?')*/
    })

    /*it('should call addTodo if length of text is greater than 0', () => {
      const { enzymeWrapper, props } = setup()
      const input = enzymeWrapper.find('TodoTextInput')
      input.props().onSave('')
      expect(props.addTodo.mock.calls.length).toBe(0)
      input.props().onSave('Use Redux')
      expect(props.addTodo.mock.calls.length).toBe(1)
    })*/
  })
})


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('posts reducer', () => {

  it('regresa el state inicial', () => {
    expect(rootReducer(undefined, types.ANY_ACTION)).toEqual({
      posts: {"item": null, "items": []},
      toggle: false
    })
  })

  it('maneja el NEW_POSTS, FETCH_POSTS, CLEAN_POST', () => {

    expect(
      postReducer({item: null, items: []}, {
        type: types.NEW_POSTS,
        payload: {
          message: "¡Hola!",
          date: new Date(2018, 11, 24)
        }
      })
    ).toEqual({
      item: {
        user: {
            name: "Bender", 
            username: "bender", 
            id: 1
        }, 
        receiver_id: 2,
        message: "¡Hola!",
        date: new Date(2018, 11, 24)
      },
      items: []
    })

    expect(
      postReducer({item: {
        user: {
            name: "Pickle Rick", 
            username: "pickle rick", 
            id: 2
        }, 
        receiver_id: 1,
        message: "¡Hola!",
        date: new Date(2018, 11, 23)
      }, items: []}, {
        type: types.NEW_POSTS,
        payload: {
          message: "¡Hola!",
          date: new Date(2018, 11, 24)
        }
      })
    ).toEqual({
      item: {
        user: {
          name: "Bender", 
          username: "bender", 
          id: 1
        }, 
        receiver_id: 2,
        message: "¡Hola!",
        date: new Date(2018, 11, 24)
      },
      items: []
    })

    expect(
      postReducer({item: {
        user: {
          name: "Pickle Rick", 
          username: "pickle rick", 
          id: 2
        }, 
        receiver_id: 1,
        message: "¡Hola!",
        date: new Date(2018, 11, 23)
      }, items: []}, {
        type: types.CLEAN_POST,
      })
    ).toEqual({
      item: null,
      items: []
    })

    expect(
      postReducer({item: null, items: []}, {
        type: types.CLEAN_POST,
      })
    ).toEqual({
      item: null,
      items: []
    })

  })

  it('maneja el TOGGLE', () => {

    expect(
      toggleReducer(false, {
        type: types.TOGGLE,
      })
    ).toEqual(true)

    expect(
      toggleReducer(true, {
        type: types.TOGGLE,
      })
    ).toEqual(false)

  })
})
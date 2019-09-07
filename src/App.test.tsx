import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import ConnectedMain, { Main } from "./components/tabs/firstTab/Main"

import { rootReducer } from './reducers'
import postReducer from "./reducers/postReducer"
import toggleReducer from "./reducers/toggleReducer"
import * as types from './actions/types'

import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ChatMessage from "./components/tabs/firstTab/chat/chatMessages/ChatMessages"

Enzyme.configure({ adapter: new Adapter() })

const posts = [{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Consectetur adipiscing elit."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Incididunt ut labore et dolore magna."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"¡Hola!","date": new Date()}]

const setup = () => {
  const props = {
    posts
  }
  const enzymeWrapper = shallow(<ChatMessage {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

const setupMain = () => {
  const props = {
    newPost: null,
    posts: [],
    fetchPosts: jest.fn(),
    toggle: false,
    cleanPost: jest.fn()
  }
  const enzymeWrapper = shallow(<Main {...props} />)
  return {
    props,
    enzymeWrapper
  }
}

//Testeando componente normal
describe('components', () => {
  describe('ChatMessages', () => {
    it('se renderiza correctamente', () => {
      const { enzymeWrapper } = setup()
      expect(enzymeWrapper.find('div').first().hasClass('chatMessages')).toBe(true)
      expect(enzymeWrapper.find('div').at(1).hasClass('chatMessagePaddingBox')).toBe(true)
      expect(enzymeWrapper.find('div').at(1).children()).toHaveLength(posts.length + 1)
      enzymeWrapper.find('.messageBox').forEach(node => {
        expect(node.find(".messageMessage").exists()).toBe(true)
        expect(node.find(".messageMessage").text().length > 0).toBe(true)
        node.find(".messageData").forEach(node => {
          expect(node.childAt(0).hasClass("messageImage")).toBe(true)
          expect(node.childAt(0).prop("width")).toBe(28)
          expect(node.childAt(0).prop("height")).toBe(28)
          expect(["ANGELA.jpg", "CARLOS.png"]).toContain(node.childAt(0).prop("src"))
          expect(node.childAt(0).prop("src"))
          expect(node.childAt(1).hasClass("messageUser")).toBe(true)
          expect(["Belle Delphine", "#1 Loser"]).toContain(node.childAt(1).text())
          expect(node.childAt(2).hasClass("messageDate")).toBe(true)
          expect(node.childAt(2).text()).toMatch(/^[\d]?\d \D\D\D[.]? - [\d]?\d:\d\d \D\D/)
        })
      })
      expect(enzymeWrapper.find('div').at(1).childAt(6).childAt(0).hasClass("divider")).toBe(true)
      expect(enzymeWrapper.find('div').at(1).childAt(6).childAt(0).childAt(0).hasClass("dividerLine")).toBe(true)
      expect(enzymeWrapper.find('div').at(1).childAt(6).childAt(0).childAt(1).hasClass("dividerDate")).toBe(true)
      expect(enzymeWrapper.find('div').at(1).childAt(6).childAt(0).childAt(1).text()).toMatch(/^(?:[\D]+[,] [\d]?\d \D\D [\D]+)/)
      expect(enzymeWrapper.find('div').at(1).childAt(7).exists()).toBe(true)
      expect(enzymeWrapper.find('div').at(1).childAt(7).prop("style")).toStrictEqual({ float:"left", clear: "both" })

    })
    it('testeando scrollIntoView', () => {
      Element.prototype.scrollIntoView = jest.fn();  // set scrollIntoView to a spy
      const wrapper = mount(<ChatMessage posts={posts} />);
      wrapper.setProps({ posts: [...posts, {"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"¡Notice me!","date": new Date()}] });
      expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    })
    describe('Main', () => {
      it('se renderiza correctamente el componente conectado cuando se cambia el estado de toggle en redux', () => {
        const { enzymeWrapper } = setupMain()
        expect(enzymeWrapper.find('div').first().hasClass('dashboard')).toBe(true)
        expect(enzymeWrapper.find('div').at(1).hasClass('menu')).toBe(true)
        enzymeWrapper.setProps({ toggle: true });
        expect(enzymeWrapper.find('div').at(1).hasClass('menu open')).toBe(true)
      })
    })
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
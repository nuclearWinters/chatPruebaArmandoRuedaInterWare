import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import { AnyAction, Action } from "redux"
import { ThunkDispatch } from "redux-thunk"

import { Main } from "./components/tabs/firstTab/Main"

import { cleanPost, createPost, fetchPosts } from "./actions/postActions"
import { toggle } from "./actions/toggleMenuActions"

import { rootReducer, AppState } from './reducers'
import postReducer from "./reducers/postReducer"
import toggleReducer from "./reducers/toggleReducer"
import * as types from './actions/types'

import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ChatMessage from "./components/tabs/firstTab/chat/chatMessages/ChatMessages"

Enzyme.configure({ adapter: new Adapter() })

const posts = [{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Consectetur adipiscing elit."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Incididunt ut labore et dolore magna."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"¡Hola!","date": new Date()}]

const setupChatMessage = () => {
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

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//Testeando componente normal
describe('Components', () => {

  describe('ChatMessages', () => {

    it('se renderiza correctamente', () => {
      const { enzymeWrapper } = setupChatMessage()
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

  })

  describe('Main', () => {

    it('se renderiza correctamente cuando se usa el action TOGGLE', () => {
      const { enzymeWrapper } = setupMain()
      expect(enzymeWrapper.find('div').first().hasClass('dashboard')).toBe(true)
      expect(enzymeWrapper.find('div').at(1).hasClass('menu')).toBe(true)
      enzymeWrapper.setProps({ toggle: true });
      expect(enzymeWrapper.find('div').at(1).hasClass('menu open')).toBe(true)
    })

  })

})

describe('Reducers', () => {

  it('El state inicial no cambia con ANY_ACTION', () => {
    expect(rootReducer(undefined, types.ANY_ACTION)).toEqual({
      posts: {"item": null, "items": []},
      toggle: false
    })
  })

  describe('Posts reducers', () => {

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
          type: types.FETCH_POSTS,
          payload: posts
        })
      ).toEqual({
        item: null,
        items: posts
      })
      expect(
        postReducer({item: null, items: posts}, {
          type: types.FETCH_POSTS,
          payload: posts
        })
      ).toEqual({
        item: null,
        items: posts
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

  })


  describe('Togle reducers', () => {
    
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
})

type DispatchExts = ThunkDispatch<AppState, null, types.ChatActionTypes>;

const middlewares = [thunk]
const mockStore = configureMockStore<AppState, DispatchExts>(middlewares)

describe('Actions', () => {

  describe('Async post action FETCH_POSTS', () => {
    afterEach(() => {
      fetchMock.restore()
    })

    it('probando async action FETCH_POST', () => {
      fetchMock.getOnce('https://chat-prueba-node.herokuapp.com/', {
        body: {"messages":[{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Consectetur adipiscing elit."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Incididunt ut labore et dolore magna."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}]},
      })
      const expectedActions = [
        { type: types.FETCH_POSTS, payload: [{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Lorem ipsum dolor sit amet, consectetur adipiscing elit."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Consectetur adipiscing elit."},{"user":{"name":"Bender","username":"bender","id":1},"receiver_id":2,"message":"Incididunt ut labore et dolore magna."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."},{"user":{"name":"Pickle Rick","username":"pickle_rick","id":2},"receiver_id":1,"message":"Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}] }
      ]
      const store = mockStore({ posts: {items: [], item: null}, toggle: false })
      return store.dispatch(fetchPosts()).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })

    })

  })

  describe('Sync posts actions CLEAN_POST, NEW_POSTS', () => {

    it('probando action CLEAN_POST', () => {
      const expectedAction = {
        type: types.CLEAN_POST,
      }
      expect(cleanPost()).toEqual(expectedAction)
    })

    it('probando action NEW_POSTS', () => {
      const postData = "¡Hola!"
      const expectedAction = {
        type: types.NEW_POSTS,
        payload: {
          message: postData,
          date: new Date()
        }
      }
      expect(createPost(postData)).toEqual(expectedAction)
    })

  })

  describe('Sync toggle action TOGGLE', () => {

    it('probando action TOGGLE', () => {
      const expectedAction = {
        type: types.TOGGLE,
      }
      expect(toggle()).toEqual(expectedAction)
    })

  })
})
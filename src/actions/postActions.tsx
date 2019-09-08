import { FETCH_POSTS, NEW_POSTS, CLEAN_POST, ChatMessage, ChatActionTypes } from "./types"
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from "../reducers/index"

const fetchPostsSuccess = (posts: {messages: ChatMessage[]}): ChatActionTypes => ({
    type: FETCH_POSTS,
    payload: posts.messages
})

export const fetchPosts = (): ThunkAction<Promise<ChatActionTypes>, AppState, null, Action<string>> => dispatch => 
    fetch('https://chat-prueba-node.herokuapp.com/')
    .then((response) => response.json())
    .then((posts) => dispatch(fetchPostsSuccess(posts)));

export const createPost = (postData: string) => ({
    type: NEW_POSTS,
    payload: {message: postData, date: new Date()}
})

export const cleanPost = (): ChatActionTypes => ({  type: CLEAN_POST })
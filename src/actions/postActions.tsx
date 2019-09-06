import { FETCH_POSTS, NEW_POSTS, CLEAN_POST, ChatMessage } from "./types"
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from "../reducers/index"

export const fetchPosts = (): ThunkAction<void, AppState, null, Action<string>> => dispatch => {
    fetch('https://chat-prueba-node.herokuapp.com/')
    .then((response) => response.json())
    .then((posts: {messages: ChatMessage}) => dispatch({
        type: FETCH_POSTS,
        payload: posts.messages
    }));
}

export const createPost = (postData: {date: Date, message: string}): ThunkAction<void, AppState, null, Action<string>> => dispatch => {
    dispatch({
        type: NEW_POSTS,
        payload: {message: postData, date: new Date()}
    })
}

export const cleanPost = (): ThunkAction<void, AppState, null, Action<string>> => dispatch => {
    dispatch({
        type: CLEAN_POST
    })
}
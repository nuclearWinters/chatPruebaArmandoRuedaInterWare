import { TOGGLE } from "./types"
import { ThunkAction } from 'redux-thunk'
import { Action } from 'redux'
import { AppState } from "../reducers/index"

export const toggle = (): ThunkAction<void, AppState, null, Action<string>> => dispatch => {
    dispatch({
        type: TOGGLE
    })
}
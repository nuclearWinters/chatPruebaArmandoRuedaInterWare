import { combineReducers } from "redux"
import postReducer from "./postReducer"
import toggleReducer from "./toggleReducer"

export const rootReducer = combineReducers({
    posts: postReducer,
    toggle: toggleReducer
})

export type AppState = ReturnType<typeof rootReducer>
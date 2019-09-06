import { AnyAction } from "redux"

export const FETCH_POSTS = "FETCH_POSTS"
export const NEW_POSTS = "NEW_POSTS"
export const CLEAN_POST = "CLEAN_POST"
export const TOGGLE = "TOGGLE"
export const ANY_ACTION: AnyAction = {
  type: "ANY_ACTION"
}

export interface ChatMessage {
  user: {
    name: string, 
    username: string, 
    id: number
  }, 
  receiver_id: number,
  message: string,
  date?: Date
}

interface FetchPostsAction {
  type: typeof FETCH_POSTS
  payload: ChatMessage[]
}

interface NewPostsAction {
  type: typeof NEW_POSTS
  payload: {
    date: Date,
    message: string
  }
}

interface CleanPostAction {
  type: typeof CLEAN_POST
}

interface ToggleAction {
  type: typeof TOGGLE
}

interface AnyActionAction {
  type: typeof ANY_ACTION
}
  
export type ChatActionTypes = FetchPostsAction | NewPostsAction | CleanPostAction | ToggleAction | AnyActionAction
import { FETCH_POSTS, NEW_POSTS, CLEAN_POST, ChatActionTypes, ChatMessage } from "../actions/types"

interface PostsTypes {
  items: ChatMessage[],
  item: ChatMessage | null
}

const initialState: PostsTypes = {
    items: [],
    item: null
}

export default function posts(state = initialState, action: ChatActionTypes ) {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            }
        case NEW_POSTS:
            return {
                ...state,
                item: {
                    user: {
                        name: "Bender", 
                        username: "bender", 
                        id: 1
                    }, 
                    receiver_id: 2,
                    message: action.payload.message,
                    date: action.payload.date
                }
            }
        case CLEAN_POST:
            return {
                ...state,
                item: null
            }
        default:
            return state
    }
}
import { FETCH_POSTS, NEW_POSTS, CLEAN_POST } from "../actions/types"

const initialState = {
    items: [],
    item: null
}

export default function posts(state = initialState, action) {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                items: action.payload
            }
        case NEW_POSTS:
            return {
                ...state,
                item: action.payload
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
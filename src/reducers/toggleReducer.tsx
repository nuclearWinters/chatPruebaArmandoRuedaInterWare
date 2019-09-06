import { TOGGLE, ChatActionTypes } from "../actions/types"

const initialState: boolean = false

export default function toggle(state = initialState, action: ChatActionTypes) {
    switch(action.type) {
        case TOGGLE:
            return !state
        default:
            return state
    }
}
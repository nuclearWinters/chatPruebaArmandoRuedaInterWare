import { TOGGLE } from "../actions/types"

const initialState = false

export default function toggle(state = initialState, action) {
    switch(action.type) {
        case TOGGLE:
            return !state
        default:
            return state
    }
}
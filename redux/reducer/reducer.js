import { ADD_ARTICLE, DATA_LOADED, FOUND_BAD_WORD } from '../action/action';

const initialState = {
    user: ''
}

export default function (state = initialState, action) {
    if (action.type === DATA_LOADED) {
        return {
            ...state,
            user: action.payload.data
        }
    }
    return state;
}

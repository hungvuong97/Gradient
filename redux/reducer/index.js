import { combineReducers } from 'redux';
import reducer from './reducer';

const rootReducer = combineReducers({
    listUser: reducer
})

export default rootReducer;
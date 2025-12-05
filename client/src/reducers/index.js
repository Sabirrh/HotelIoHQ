import {combineReducers } from 'redux';
import { authReducer} from './auth';
//3.compine multiple reducers
const rootReducer = combineReducers({
  auth:authReducer,

})
export default rootReducer;
import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import userLogin from './userLogin';
import installmentSaving from './installmentSaving';
import deposit from './deposit';


export default combineReducers({
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
  userLogin,
  deposit,
  installmentSaving,
  pender: penderReducer
});
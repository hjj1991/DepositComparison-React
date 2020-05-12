import { combineReducers } from 'redux';
import { penderReducer } from 'redux-pender';
import userLogin from './userLogin';
import installmentSaving from './installmentSaving';


export default combineReducers({
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
  userLogin,
  installmentSaving,
  pender: penderReducer
});
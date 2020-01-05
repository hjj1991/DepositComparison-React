import { createAction, handleActions } from 'redux-actions';
import * as service from 'services/posts';
import { Map } from 'immutable';
// import { listenerCount } from 'cluster';


const SET_LOGGED_INFO = 'userLogin/SET_LOGGED_INFO';


export const setLoggedInfo = createAction(SET_LOGGED_INFO);


const initialState = {
    data: [],

}

export default handleActions({

    [SET_LOGGED_INFO]: (state, action) => {
        return{
            data: action.payload
        }
    }


}, initialState);
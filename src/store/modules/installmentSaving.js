import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';
import * as service from 'services/posts';
import { Map } from 'immutable';
// import { listenerCount } from 'cluster';

function axiosGetInstallmentSavingList(){
    return service.getInstallmentSavingList();
}




const GET_INSTALLMENTSAVING_LIST = 'GET_INSTALLMENTSAVING_LIST';
const SET_DATA_CHANGE = 'SET_DATA_CHANGE';


export const setDataChange = createAction(SET_DATA_CHANGE, (formData) => { return formData;});
export const getInstallmentSavingList = createAction(GET_INSTALLMENTSAVING_LIST, axiosGetInstallmentSavingList);




const initialState = {
    data: [],
    filterData: []

}

export default handleActions({
    ...pender({
        type: GET_INSTALLMENTSAVING_LIST, // type 이 주어지면, 이 type 에 접미사를 붙인 액션핸들러들이 담긴 객체를 생성합니다.
        /*
            요청중 / 실패 했을 때 추가적으로 해야 할 작업이 있다면 이렇게 onPending 과 onFailure 를 추가해주면됩니다.
            onPending: (state, action) => state,
            onFailure: (state, action) => state
        */
        onSuccess: (state, action) => { // 성공했을때 해야 할 작업이 따로 없으면 이 함수 또한 생략해도 됩니다.
            return {
                data: action.payload.data.list,
                filterData: action.payload.data.list
            }
        }
        // 함수가 생략됐을때 기본 값으론 (state, action) => state 가 설정됩니다 (state 를 그대로 반환한다는 것이죠)
    }),
    [SET_DATA_CHANGE]: (state, action) => {
        let result = state.data;

        if(action.payload.rsrvTypeNm.value !== ""){
            result = result.filter( (element) => {
                // console.log(element);
                element.optionList = element.optionList.filter( (temp) => {
                    console.log(temp);
                    return temp.rsrvTypeNm === action.payload.rsrvTypeNm.value;
                });
                
                return element.optionList.length !== 0;
            });
        }
        
        if(action.payload.bankRole.value !== ""){
            result = result.filter( (element) => {
                console.log(element.bankInfo.bankRole);
                
                return element.bankInfo.bankRole === action.payload.bankRole.value
            });
        }
        console.log(result);

        return{
            data: state.data,            
            filterData: result
            
        }

    },



}, initialState);
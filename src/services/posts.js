import axios from 'axios';
import userLogin from '../store/modules/userLogin';
import { useDispatch  } from 'react-redux'

var siteUrl = "http://localhost:8080";


export function getCheckId(id) {
    return axios.get(siteUrl + `/v1/user/checkid/` + id);
}

export function getBoardList(page, pageSize, searchTarget, searchKeyword){
    return axios.get(siteUrl + '/api/board', {
        params: {
            page: page, 
            pageSize: pageSize, 
            searchTarget: searchTarget,
            searchKeyword: searchKeyword
        }
    });
}
export function getBoardDetail(indx){
    return axios.get(siteUrl + '/api/board/' + indx);
}

export function postSignUp(data){
    return axios.put(siteUrl + '/v1/signup', {
        userId: data.userId,
        password: data.userPw,
        name: data.userName,
        nickName: data.userNickName,
        emailAddr: data.userEmail
    
    });
}

export function postSignIn(data){
    return axios.post(siteUrl + '/v1/signin',{
        userId: data.userId,
        password: data.userPw
    });
}

export function postTokenReissue(data){
    return axios.post(siteUrl + '/v1/tokenreissue',{
        refreshToken: data
    });
}

export function postBoardInsert(data, token){
    console.log(token);
    return axios(
    {
        url:siteUrl + '/api/board/write',
        method: 'post',
        headers: {
            "X_AUTH_TOKEN": token
        },
        data:{
            title: data.title,
            contents: data.contents
        }
    });
}


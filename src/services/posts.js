import axios from 'axios';
import storage from 'lib/storage';
import userLogin from '../store/modules/userLogin';
import { useDispatch  } from 'react-redux'



axios.interceptors.response.use( response => {
    return response;
}, async error => {
    console.log("에잉??");
    if(typeof error.response !== 'undefined'){
        console.log("에잉??222");
        if(error.response.status === 401 && storage.get('userLogin') !== null){         //authToken 검증 실패시 refresh토큰을 이용하여 갱신
            let userInfo = storage.get('userLogin');
            console.log("에잉??");
            try {
                const result = await postTokenReissue(userInfo.X_REFRESH_TOKEN);
                if(result.data.success === true){
                    userInfo.X_AUTH_TOKEN = result.data.data.X_AUTH_TOKEN;
                    userInfo.exAuthToken = result.data.data.exAuthToken;
                    storage.set('userLogin', userInfo);
                    error.response.config.headers.X_AUTH_TOKEN = result.data.data.X_AUTH_TOKEN;
                    return await axios(error.response.config);
    
                }
            } catch (error) {
                console.log("에잉??");
                storage.remove('userLogin');
                alert('세션이 만료되었습니다. 다시 로그인하세요.');
                window.location.href = 'http://dognas.ipdisk.co.kr';
                // window.location.href = 'http://localhost:3000';
                return Promise.reject(error);
            }

        }
    }
        return Promise.reject(error);
    
});

// var siteUrl = "http://localhost:8080";
var siteUrl = "http://dognas.ipdisk.co.kr:8080";


export function getCheckId(id) {
    return axios.get(siteUrl + `/v1/user/check/` + id);
}

export function getUserDetail(token){
    console.log(token);
    return axios(
        {
            url:siteUrl + '/v1/user',
            method: 'get',
            headers: {
                "X_AUTH_TOKEN": token
            }
        }
    )
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
    return axios.post(siteUrl + '/v1/signup', {
        userId: data.userId,
        userPw: data.userPw,
        name: data.userName,
        email: data.userEmail
    
    });
}

export function postSignIn(data){
    return axios.post(siteUrl + '/v1/signin',{
        userId: data.userId,
        userPw: data.userPw
    });
}

export function postSignOut(token){
    return axios(
        {
            url:siteUrl + '/v1/signout',
                method: 'post',
                headers: {
                    "X_REFRESH_TOKEN": token
                },
            
        }
    )
}

export function postTokenReissue(data){
    return axios.post(siteUrl + '/v1/tokenreissue',{
        refreshToken: data
    });
}

export function postBoardInsert(data, token){
    return axios(
    {
        url:siteUrl + '/api/board/write',
        method: 'post',
        headers: {
            "X_AUTH_TOKEN": token
        },
        data:{
            boardType: "0",
            title: data.title,
            contents: data.contents
        }
    });
}

export function postBoardModify(data, token){
    return axios(
    {
        url:siteUrl + '/api/board/' + data.boardIdx,
        method: 'put',
        headers: {
            "X_AUTH_TOKEN": token
        },
        data:{
            boardType: data.boardType,
            title: data.title,
            contents: data.contents
        }
    });
}

export function postLoginToKakao(data){
    return axios(
    {
        url:siteUrl + '/v1/social/login',
        method: 'post',
        data: data
    });
}

export function getInstallmentSavingList() {
    return axios.get(siteUrl + `/v1/insmoney/`);
}
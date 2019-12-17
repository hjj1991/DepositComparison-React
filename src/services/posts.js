import axios from 'axios';

var siteUrl = "http://localhost:8080";

export function getCheckId(id) {
    return axios.get(siteUrl + `/api/member/checkId`, {
        params: {userId: id}

    // headers: {
    //     "Content-Type" : "application/vnd.netiq.platespin.protect.WorkloadsDetails+json",
    //     "Accept" : "application/json",}
        
    });
}

export function getBoardList(page, pageSize){
    return axios.get(siteUrl + '/api/board', {
        params: {page: page, pageSize: pageSize}
    });
}

export function postSignUp(data){
    return axios.put(siteUrl + '/api/member/signup', {
        userId: data.userId,
        userPw: data.userPw,
        name: data.userName,
        nickName: data.userNickName,
        emailAddr: data.userEmail
    
    });
}

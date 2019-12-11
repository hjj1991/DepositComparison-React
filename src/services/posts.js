import axios from 'axios';

export function getCheckId(id) {
    return axios.get(`http://localhost:8080/api/member/checkId`, {
        params: {userId: id}

    // headers: {
    //     "Content-Type" : "application/vnd.netiq.platespin.protect.WorkloadsDetails+json",
    //     "Accept" : "application/json",}
        
    });
}

export function postSignUp(data){
    return axios.put('http://localhost:8080/api/member/signup', {
        userId: data.userId,
        userPw: data.userPw,
        name: data.userName,
        nickName: data.userNickName,
        emailAddr: data.userEmail
    
    });
}

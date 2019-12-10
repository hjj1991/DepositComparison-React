import axios from 'axios';

export function getCheckId(id) {
    return axios.get(`http://localhost:8080/api/member/checId`, {
        params: {userId: id}

    // headers: {
    //     "Content-Type" : "application/vnd.netiq.platespin.protect.WorkloadsDetails+json",
    //     "Accept" : "application/json",}
        
    });
}

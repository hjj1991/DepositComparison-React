import React from 'react';
import SignUp from 'components/SignUp';
import * as service from 'services/posts'
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class SignUpContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idCheckMessage: "5~20자의 영문 소문자, 숫자만 사용 가능합니다.",
            exFontColor: "red"
        };
    }

    getPost = async (userId) => {

        this.setState({
            pending: false,
            isCheckId: undefined,
           
        });
        try {
            const post = await service.getCheckId(userId)
            console.log(post);

            if(post.data === 1){
                this.setState({
                    idCheckMessage : "이미 사용중이거나 탈퇴한 아이디입니다.",
                    exFontColor: "red"
                })
            }else{
                this.setState({
                    idCheckMessage : "사용가능한 아이디입니다.",
                    exFontColor: "green"
                })
            }
        } catch(e) {
            console.log('에러가 발생!');
        }
    }

    handleCheckUserId = (e) => {
        this.setState({
            pending: false
        })
        var re = /^[a-z0-9]{5,20}$/ // 아이디와 패스워드가 적합한지 검사할 정규식
        var id = e.target.value;
        if(re.test(id)){
            this.getPost(id);
        }else{
            this.setState({
                idCheckMessage: "5~20자의 영문 소문자, 숫자만 사용 가능합니다.",
                exFontColor: "red"
            })
        }


    }

    render(){
        return(
            <SignUp 
                checkUserId={this.handleCheckUserId}
                idCheckMessage={this.state.idCheckMessage}    
                exFontColor={this.state.exFontColor}
            />
        )
    }

}

export default SignUpContainer;
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
            idCheck: false,
            idFontColor: "red",
            pwCheckMessage: "비밀번호는 영문 숫자 조합 7 ~ 14자리 이상입니다.",
            pwCheck: false,
            pwFontColor: "red",
            pw2Check: false,
            nameCheck: false,
            nameCheckMessage: "공백제외 2 ~ 10자로 입력해주세요.",
            nameFontColor: "red",
            nickNameCheck: false,
            nickNameCheckMessage: "한글, 영문, 숫자가 아닙니다.",
            nickNameFontColor: "red",
            isOk: false
        };
    }

    getPost = async (userId) => {

        this.setState({
            pending: false,
            isCheckId: undefined,
           
        });
        try {
            const post = await service.getCheckId(userId)
            //console.log(post);

            if(post.data === 1){
                this.setState({
                    idCheckMessage : "이미 사용중이거나 탈퇴한 아이디입니다.",
                    idFontColor: "red",
                    idCheck: false
                })
            }else{
                this.setState({
                    idCheckMessage : "사용가능한 아이디입니다.",
                    idFontColor: "green",
                    idCheck: true
                })
            }
        } catch(e) {
            console.log('에러가 발생!');
        }
    }

    postSignUp = async (data) => {
        try {
            await service.postSignUp(data);
            this.setState({
                isOk: true
            })
            
         } catch(e) {
             console.log('에러가 발생!');
             alert("다시하세요");
         }
    }

    handleOnSubmit = (e) => {
        e.preventDefault(); 
        //console.log(e.target.userId.value);
        
        this.setState({
            signUpData:{
                        userId: e.target.userId.value,
                        userPw: e.target.userPw.value,
                        userName: e.target.userName.value,
                        userNickName: e.target.userNickName.value,
                        userEmail: e.target.userEmail.value
                }
        }, () =>  {
            let checkData = this.state;

            if(checkData.idCheck && checkData.pwCheck && checkData.pw2Check && checkData.nameCheck && checkData.nickNameCheck && (document.getElementById("userEmail").value !="")){
                this.postSignUp(this.state.signUpData)
            }
        }
        );
        //console.log(this.state);

       
        
        //this.setState({});
        
    }

    handleCheckValue = (e) => {
        this.setState({
            pending: false
        })
        let re = /^[a-z0-9]{5,20}$/     // 아이디와 패스워드가 적합한지 검사할 정규식
        let targetId = e.target.id;
        
        if(targetId === "userPw"){      //패스워드 유효성 검증
            var reg1 = /^[a-z0-9]{7,14}$/;    // a-z 0-9 중에 7자리 부터 14자리만 허용 한다는 뜻이구요
            var reg2 = /[a-z]/g;    
            var reg3 = /[0-9]/g; 
            let pw = e.target.value;

            if(reg1.test(pw) && reg2.test(pw) && reg3.test(pw)){
                this.setState({
                    pwCheckMessage: "사용가능한 비밀번호입니다.",      
                    pwFontColor: "green",
                    pwCheck: true
                })
            }else{
                this.setState({
                    pwCheckMessage: "비밀번호는 영문 숫자 조합 7 ~ 14자리 이상입니다.",   
                    pwFontColor: "red",
                    pwCheck: false         
                })  
            }
        }
        if(targetId === "userPw2"){
            if(document.getElementById("userPw").value === document.getElementById("userPw2").value){
                this.setState({
                    pw2CheckMessage: "비밀번호가 일치합니다.",
                    pw2FontColor: "green",
                    pw2Check: true
                })
            }else{
                this.setState({
                    pw2CheckMessage: "비밀번호가 일치하지 않습니다.",
                    pw2FontColor: "red",
                    pw2Check: false
                })
            }
        }
        if(targetId === "userId"){      //아이디 유효성 검증
            let id = e.target.value;
            if(re.test(id)){
                this.getPost(id);
            }else{
                this.setState({
                    idCheckMessage: "5~20자의 영문 소문자, 숫자만 사용 가능합니다.",
                    idFontColor: "red",
                    idCheck: false
                })
            }
        }
        if(targetId === "userName"){
            let pattern = /([^가-힣\x20^a-z^A-Z^0-9])/i;
            let blank_pattern = /[\s]/g;
            let name = e.target.value;

            if((!pattern.test(name)) && name.length >= 2 && name.length <= 10 && (!blank_pattern.test(name))){
                this.setState({
                    nameCheck: true,
                    nameFontColor: "green",
                    nameCheckMessage: "사용가능합니다.",
                })
            }else{
                this.setState({
                    nameCheck: false,
                    nameFontColor: "red",
                    nameCheckMessage: "공백제외 2 ~ 10자로 입력해주세요.",
                })
            }
        }
        if(targetId === "userNickName"){
            let pattern = /([^가-힣\x20^a-z^A-Z^0-9])/i;
            let blank_pattern = /[\s]/g;
            let nickName = e.target.value;
           
            if((!pattern.test(nickName)) && nickName.length >= 2 && nickName.length <= 10 && (!blank_pattern.test(nickName))){
                this.setState({
                    nickNameCheck: true,
                    nickNameFontColor: "green",
                    nickNameCheckMessage: "사용가능합니다"
                })

                
            }else{
                this.setState({
                    nickNameCheck: false,
                    nickNameFontColor: "red",
                    nickNameCheckMessage: "한글, 영문, 숫자가 아닙니다.",

            })
            }
        }

    }

    render(){
        return(
            <SignUp 
                signUpSubmit={this.handleOnSubmit}
                checkUserValue={this.handleCheckValue}
                idCheckMessage={this.state.idCheckMessage}  
                idFontColor={this.state.idFontColor}  
                pwCheckMessage={this.state.pwCheckMessage}  
                pwFontColor={this.state.pwFontColor}
                pw2CheckMessage={this.state.pw2CheckMessage}  
                pw2FontColor={this.state.pw2FontColor}
                nameCheckMessage={this.state.nameCheckMessage}
                nameFontColor={this.state.nameFontColor}
                nickNameCheckMessage={this.state.nickNameCheckMessage}
                nickNameFontColor={this.state.nickNameFontColor}
                isOk={this.state.isOk}
            />
        )
    }

}

export default SignUpContainer;
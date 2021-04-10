import React from 'react';
import SignIn from 'components/SignIn';
import { bindActionCreators } from 'redux';
import * as service from 'services/posts'
import { connect } from 'react-redux';
import * as loginOkActions from '../store/modules/userLogin';
import storage from 'lib/storage';
import LoadingOverlay from 'react-loading-overlay';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class SignInContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pending: false,
            loading: false,
            data: [],
            msg:"",
            success: false
        };
    }

    componentDidMount() {
    
    }

    getPost = async (signInData) => {
        const { LoginOkActions } = this.props;
        try {
            this.setState({
                pending: true
            })
            const data = await service.postSignIn(signInData);
            // console.log(data);
            if(data.data.success){
                LoginOkActions.setLoggedInfo(data.data.data);
                storage.set('userLogin', data.data.data);

            }
            this.setState({
                data: data,
                pending: false,
                msg: data.data.msg,
                success: data.data.success
            });
            
            
        } catch(e) {
            // console.log('에러가 발생!');
        }
    }

    hanldeLoginClick = (e) => {
        e.preventDefault(); 
        // console.log(e.target);
        if(e.target.userId.value === ""){
            alert("아이디를 입력해주세요.");
        }else if( e.target.userPw.value === ""){
            alert("비밀번호를 입력해주세요.")
        }else{
            const signInData ={
                userId: e.target.userId.value,
                userPw: e.target.userPw.value,
            }
            this.getPost(signInData);
        }
    }

    render(){
        // const { PostActions, data, loading, error, isLoading } = this.props;
        const { data, loading, msg, success, pending } = this.state;
        return(
            <LoadingOverlay
                active={pending}
                spinner
                text='잠시만 기다려주세요...'
                styles={{
                    overlay: (base) => ({
                    ...base,
                    "position": "fixed",
                    "width": "100%",
                    "height": "100%",
                    "left": "0",
                    "z-index": "10"
                    })
                }}
                >
                <SignIn
                    onClickSubmit={this.hanldeLoginClick}
                    data={data}
                    msg={msg}
                    success={success}
                    loading={loading}
                />
            </LoadingOverlay>
            )
    }

}





export default connect(
    (state) => ({
        // success: state.userLogin.data.success,
        // loading: state.userLogin.pending,
        // error: state.userLogin.error,
        // isLoading: state.userLogin.isLoading
    }),
    (dispatch) => ({
        LoginOkActions: bindActionCreators(loginOkActions, dispatch)
    })
)(SignInContainer);
// export default SignInContainer;
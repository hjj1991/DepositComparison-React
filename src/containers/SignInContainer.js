import React from 'react';
import SignIn from 'components/SignIn';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as postActions from '../store/modules/userLogin';
import * as service from 'services/posts'

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class SignInContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        // 컴포넌트가 처음 마운트 될 때 현재 number 를 postId 로 사용하여 포스트 내용을 불러옵니다.
        const { PostActions } = this.props;
    
    }

    getPost = async (signUpData) => {
        const { PostActions } = this.props;

        try {
            await PostActions.postLogin(signUpData);
            console.log('요청이 완료 된 다음에 실행됨')
        } catch(e) {
            console.log('에러가 발생!');
        }
    }

    hanldeLoginClick = (e) => {
        e.preventDefault(); 
        console.log(e.target);
        const signUpData ={
            userId: e.target.userId.value,
            userPw: e.target.userPw.value,
        }
        console.log(signUpData);
        this.getPost(signUpData);
        
    }

    render(){
        const { PostActions, post, loading, error, isLoading } = this.props;
        return(
            <SignIn
            onClickSubmit={this.hanldeLoginClick}
            />
        )
    }

}





export default connect(
    (state) => ({
        post: state.userLogin.data,
        loading: state.userLogin.pending,
        error: state.userLogin.error,
        isLoading: state.userLogin.isLoading
    }),
    (dispatch) => ({
        PostActions: bindActionCreators(postActions, dispatch)
    })
)(SignInContainer);
// export default SignInContainer;
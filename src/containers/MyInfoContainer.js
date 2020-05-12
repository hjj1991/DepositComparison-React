import React from 'react';
import MyInfo from 'components/MyInfo';
import { bindActionCreators } from 'redux';
import * as service from 'services/posts'
import { connect } from 'react-redux';
import * as userInfoActions from 'store/modules/userLogin';
import storage from 'lib/storage';
import Modal from '../components/Modal/Modal';
import LoadingOverlay from 'react-loading-overlay';


class MyInfoContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            pending: false

        };
    }

    componentDidMount() {
        console.log("하이");
        console.log(this.props.userInfo);
        // if(typeof this.props.userInfo.X_REFRESH_TOKEN != "undefined"){
            this.getData();
        // }
      }

    getData = async () => {
        try {
            this.setState({
                pending: true
            })
            const { UserInfoActions } = this.props;
            const data = await service.getUserDetail(this.props.userInfo.X_REFRESH_TOKEN);
            if(data.data.success){
                this.setState({
                    pending: false,
                    isLoading: true,
                    userInfo: data.data.data,
                })
            }else if(data.data.code === "999"){
                storage.remove('userLogin');
                UserInfoActions.deleteLoggedInfo();
                this.setState({
                    pending: false,
                    contents: "로그인이 필요합니다.",
                })
            }
            
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    }

    postLogout = async () =>{
        try {
            this.setState({
                pending: true
            })
            const data = await service.postSignOut(this.props.userInfo.X_REFRESH_TOKEN);
            const { UserInfoActions } = this.props;
                storage.remove('userLogin');
                UserInfoActions.deleteLoggedInfo();
                this.setState({
                    pending: false,
                })
            
        } catch(e) {
            console.log("에러가 발생!2");
        }
        window.location.href = 'http://localhost:3000';
    }

    handleLogoutClick = () => {
        this.postLogout();
    }


    render(){
        console.log(this.state.isLoading);
        return(
            this.state.isLoading?
            (
                <LoadingOverlay
                    active={this.state.pending}
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
                    <MyInfo 
                        userInfo={this.state.userInfo}
                        onClickLogout={this.handleLogoutClick}
                    />
                </LoadingOverlay>
            ):(
                <LoadingOverlay
                active={this.state.pending}
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
            </LoadingOverlay>
            )

        )
    }

}

let mapStateToProps = (state) => {
    return {
        userInfo: state.userLogin.data
    };
}
const mapDispatchToProps = dispatch => ({
    UserInfoActions: bindActionCreators(userInfoActions, dispatch),
    // AnotherActions: bindActionCreators(anotherActions, dispatch)
  });



export default connect(
    mapStateToProps,     
    mapDispatchToProps
)(MyInfoContainer);
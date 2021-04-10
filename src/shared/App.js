import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import storage from 'lib/storage';
import { Route, Switch } from 'react-router-dom';
import { Home, SignUp, SignIn, Board, BoardDetail, BoardWrite, MyInfo, SocialLogin } from 'pages';
import * as loginOkActions from '../store/modules/userLogin';
import loding from 'images/loading.gif';
import Menu from 'components/Menu';
import 'css/style.css'
import InstallmentSaving from '../pages/InstallmentSaving';
import Deposit from '../pages/Deposit';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }; 
    }

    initializeUserInfo = async () => {
        var today = new Date();
        const loggedInfo = storage.get('userLogin'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
        if(!loggedInfo){// 로그인 정보가 없다면 여기서 멈춥니다.
            this.setState({
                loading: true
            })
        }else{
            const { LoginOkActions } = this.props;
            try{
                await LoginOkActions.setLoggedInfo(loggedInfo);
                if(this.props.userInfo.exAuthToken < today.getTime()){//액세스토큰 만료시간을 비교하여 만료되었으면 refresh토큰을 이용하여 갱신함
                    await LoginOkActions.setRefreshAccessToken(this.props.userInfo);
                    storage.set('userLogin', this.props.userInfo);
                }

            }catch{
                storage.remove('userLogin');
                LoginOkActions.deleteLoggedInfo();
                this.setState({
                    pending: false,
                })
            }
            this.setState({
                loading: true
            })
        }


        // try {
        //     await UserActions.checkStatus();
        // } catch (e) {
        //     storage.remove('loggedInfo');
        //     window.location.href = '/auth/login?expired';
        // }

    }
    
    componentDidMount() {
        this.initializeUserInfo();
    }
    render() {
        return (
            this.state.loading?(
            <div>
                <Menu/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/signup" component={SignUp} />
                <Switch>
                    <Route exact path="/board/write/" component={BoardWrite} />
                    <Route path="/board/:name" component={BoardDetail} />
                    <Route path="/board" component={Board} />
                </Switch>
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/myinfo" component={MyInfo} />
                <Route path="/sociallogin" component={SocialLogin} />
                <Route path="/saving/installment" component={InstallmentSaving} />
                <Route path="/saving/deposit" component={Deposit} />
                {/* <Route exact path="/DashBoard" component={DashBoard}/>
                <Route exact path="/workloads" component={Workloads}/> */}
                {/* <Switch>
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch> */}
            </div>
            ):(
                <img style={{"width": "100%"}} src={loding} alt="로딩" />
            )
        );
    }
}



let mapStateToProps = (state) => {
    return {
        userInfo: state.userLogin.data
    };
}
export default connect(
    (mapStateToProps),
    (dispatch) => ({
        LoginOkActions: bindActionCreators(loginOkActions, dispatch)
    })
)(App);
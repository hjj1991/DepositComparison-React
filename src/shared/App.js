import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import storage from 'lib/storage';
import { Route, Switch } from 'react-router-dom';
import { Home, SignUp, SignIn, Board, BoardDetail, BoardWrite } from 'pages';
import * as loginOkActions from '../store/modules/userLogin';
import Menu from 'components/Menu';
import 'css/style.css'

class App extends Component {

    initializeUserInfo = async () => {
        const loggedInfo = storage.get('userLogin'); // 로그인 정보를 로컬스토리지에서 가져옵니다.
        if(!loggedInfo) return; // 로그인 정보가 없다면 여기서 멈춥니다.

        const { LoginOkActions } = this.props;
        LoginOkActions.setLoggedInfo(loggedInfo);
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
                
                {/* <Route exact path="/DashBoard" component={DashBoard}/>
                <Route exact path="/workloads" component={Workloads}/> */}
                {/* <Switch>
                    <Route path="/about/:name" component={About}/>
                    <Route path="/about" component={About}/>
                </Switch> */}
            </div>
        );
    }
}

export default connect(
    null,
    (dispatch) => ({
        LoginOkActions: bindActionCreators(loginOkActions, dispatch)
    })
)(App);
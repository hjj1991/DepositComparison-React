import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import BoardWrite from 'components/BoardWrite';
import * as service from 'services/posts'
import loding from 'images/loading.gif';
import 'codemirror/lib/codemirror.css';
import * as userInfoActions from 'store/modules/userLogin';


// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class BoardWriteContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            pending: false,
            isOk: false,
            isModalOpen: false
        };
    };

    componentDidMount() {
    
    }

    postBoardInsert = async (data) => {
        try {
            var today = new Date();
            const { UserInfoActions } = this.props;
            console.log(today.getTime());
            console.log(this.props.userInfo.exAuthToken);
            if(this.props.userInfo.exAuthToken < today.getTime()){ //액세스토큰 만료시간을 비교하여 만료되었으면 refresh토큰을 이용하여 갱신함
                const result2 = await service.postTokenReissue(this.props.userInfo.X_REFRESH_TOKEN);
                if(result2.data.code === "1"){
                    console.log("안녕");
                    UserInfoActions.refreshAccessToken(result2.data.X_AUTH_TOKEN, result2.data.exAuthToken);
                    console.log("안녕2");
                }else{  //리프레쉬토큰도 만료되면 새로 로그인해야함
                }
            }
            console.log(this.props.userInfo.X_AUTH_TOKEN);
            const result = await service.postBoardInsert(data, this.props.userInfo.X_AUTH_TOKEN);
            
            console.log(result);
            if(result.status === 200){
                if(result.data === "Success"){
                    this.setState({
                        isOk: true
                    });
                }else if(result.data.code === "999"){
                }
            }
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    };

    handleWriteBoard = (e, contents) =>{
        e.preventDefault(); 
        
        // console.log(contents);
        let data = {
            "title": e.target.boardTitle.value,
            "contents": contents
        }
        // console.log(this.props.userInfo.X_AUTH_TOKEN);
        this.postBoardInsert(data);

        // console.log(data);
    }

    render(){
        // this.getPost(this.props.page, this.props.pageSize);
        // var boardList = getPost(1, 20);\
        
        return(
        <BoardWrite 
            writeBoard={this.handleWriteBoard}
            isOk={this.state.isOk}
        />
        )};



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
)(BoardWriteContainer);
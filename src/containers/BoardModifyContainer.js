import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import BoardModify from 'components/BoardModify';
import * as service from 'services/posts'
import 'codemirror/lib/codemirror.css';
import * as userInfoActions from 'store/modules/userLogin';
import storage from 'lib/storage';
import Modal from '../components/Modal/Modal';


// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class BoardModifyContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            pending: false,
            isOk: false,
            isModalOpen: false,
            mount: false
        };
    };

    componentDidMount() {
        this.setState({
            title: this.props.boardDetail.title,
            contents: this.props.boardDetail.contents,
            mount: true
        })
    }

    postBoardModify = async (data) => {
        try {
            var today = new Date();
            const { UserInfoActions } = this.props;
            if(this.props.userInfo.exAuthToken < today.getTime()){ //액세스토큰 만료시간을 비교하여 만료되었으면 refresh토큰을 이용하여 갱신함
                const result2 = await service.postTokenReissue(this.props.userInfo.X_REFRESH_TOKEN);
                if(result2.data.code === "1"){
                    UserInfoActions.refreshAccessToken(result2.data.X_AUTH_TOKEN, result2.data.exAuthToken);
                }else{  //리프레쉬토큰도 만료되면 새로 로그인해야함
                    storage.remove('userLogin');
                    UserInfoActions.deleteLoggedInfo();
                    this.setState({
                        isModalOpen: true
                    })
                }
            }
            this.setState({
                pending: true
            })
            const result = await service.postBoardModify(data, this.props.userInfo.X_AUTH_TOKEN);
            
            if(result.status === 200){
                if(result.data === "Success"){
                    this.setState({
                        isOk: true,
                        pending: false
                    });
                }else if(result.data.code === "999"){
                    storage.remove('userLogin');
                    UserInfoActions.deleteLoggedInfo();
                    this.setState({
                        isModalOpen: true
                    })
                }
            }
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    };

    handleModifyBoard = (e, contents) => {
        e.preventDefault();

        let data = {
            "boardIdx": this.props.boardDetail.boardIdx,
            "boardType": this.props.boardDetail.boardType,
            "title": e.target.boardTitle.value,
            "contents": contents
        }

        this.postBoardModify(data);
    }



    handleChangeTitleValue = (e, title) =>{   //글 수정버튼 이벤트
        e.preventDefault(); 
        console.log(e.target);
        
        this.setState({
            title: e.target.value
        })
        
    }


    render(){
        // this.getPost(this.props.page, this.props.pageSize);
        // var boardList = getPost(1, 20);\
        console.log(this.state);
        console.log(this.props);
        
        return(
            this.state.isModalOpen?(
                <Modal isOpen="true" contents="로그인이 필요합니다." page="/signin"/>
            ):(
                <BoardModify
                    title={this.state.title}
                    contents={this.state.contents}
                    onChangeTitleValue={this.handleChangeTitleValue}
                    submitModifyBoard={this.handleModifyBoard}
                    mount={this.state.mount}
                    isOk={this.state.isOk}
                    pending={this.state.pending}
                />
            )
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
)(BoardModifyContainer);
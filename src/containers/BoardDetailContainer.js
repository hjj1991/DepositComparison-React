import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import BoardDetail from 'components/BoardDetail';
import BoardModify from 'components/BoardModify';
import * as service from 'services/posts'
import loding from 'images/loading.gif';
import * as userInfoActions from 'store/modules/userLogin';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class BoardDetailContainer extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            pending: false,
            isOk: false,
            writeFlag: true
        };
    }

    componentDidMount() {
            this.getPost(this.props.detailIndx);
        }

    getPost = async (indx) => {
        try {
            const post = await service.getBoardDetail(indx);
            console.log(post);
            this.setState({
                boardDetail: post,
                isOk: true
            });
            
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    };

    handleModifyBoard = (e, contents) =>{   //글 수정버튼 이벤트
        e.preventDefault(); 
        
        console.log("할롱");
        this.setState({
            writeFlag: false
        });
        console.log(this.state.writeFlag);
        
    }



    render(){
        // this.getPost(this.props.page, this.props.pageSize);
        // var boardList = getPost(1, 20);
        console.log(this.state.writeFlag1);
        if(this.state.writeFlag){
            return(
                this.state.isOk?(<BoardDetail 
                        boardDetail={this.state.boardDetail.data}
                        onClickPage={this.handleChangePage}
                        onClickModify={this.handleModifyBoard}
                        />):
                        <img style={{"width": "100%"}} src={loding} />
                
                )


        }else{
            return(
                <BoardModify
                    boardDetail={this.state.boardDetail.data} 
                />
            )
        }
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
) (BoardDetailContainer);
import React from 'react';
import * as service from 'services/posts';
import loding from 'images/loading.gif';
import DepositComment from 'components/DepositComment';
import * as userInfoActions from 'store/modules/userLogin';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class DepositCommentContainer extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            pending: false,
            isOk: false,
            modalOpen: false,
            modiFlag: false,
            modalTitle: "",
            modalBody: ""
        };
    }

    componentDidUpdate(prevProps, prevState) {                  //props 변화에 따라 기존 컴포넌트의 업데이트 진행 함수
    
    }

    componentDidMount() {
        this.getComment(this.props.depositId);
    }


    getComment = async (depositId) => {
        try {
            const post = await service.getDepositCommentList(depositId);
            // console.log(post);
            if(post.data.success === true){
                this.setState({
                    commentList: post.data.list,
                    isOk: true
                });
            }
            
            
            
        } catch(e) {
            // console.log('에러가 발생!');
        }
    };

    deleteComment = async (commentId, token) => {
        try {
            const post = await service.deleteDepositComment(commentId, token);
            console.log(post);
            if(post.data.success === true){
                this.setState({
                    modalOpen: false,
                    modalTitle: "",
                    modalBody: "",
                    deleteIdx: "",
                    isOk: false
                });
                this.getComment(this.props.depositId);
            }
            
            
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    };
    createComment = async (depositId, token, contents) => {
        try{
            const comment = await service.addDepositComment(depositId, token, contents);
            if(comment.data.success === true){
                this.setState({
                    isOk: false
                })
            }
            this.getComment(this.props.depositId);
        } catch(e) {
            console.log("에러발생!");
        }
    }

    modifyComment = async (commentId, token, contents) => {
        try{
            const comment = await service.modifyDepositComment(commentId, token, contents);
            if(comment.data.success === true){
                this.setState({
                    isOk: false,
                    modifyIdx: "",
                    modalOpen: false,
                    modalTitle: "",
                    modiFlag: false
                })
            }
            this.getComment(this.props.depositId);
        } catch(e) {
            console.log("에러발생!");
        }
    }
    


    handleCommentDelete = (e, element) => {
        // console.log(element);
        this.setState({
            modalOpen: true,
            modalTitle: "댓글삭제",
            modalBody: "이 댓글을 삭제하시겠습니까?",
            deleteIdx: element.commentIdx
        })
    }

    handleCommentCreate = (e) => {
        e.preventDefault(); 
        // console.log(e.target.commentTextArea);
        this.createComment(this.props.depositId, this.props.userInfo.X_AUTH_TOKEN, e.target.commentTextArea.value);
    }
    
    handleCommentModify = (e, element) => {
        this.setState({
            modalOpen: true,
            modalTitle: "댓글수정",
            contents: element.contents,
            modifyIdx: element.commentIdx,
            modiFlag: true
        })
    }

    handleCommentModifyChange = (e) => {
        this.setState({
            contents: e.target.value
        })
    }

    onClickCancelButton = (e) => {
        this.setState({
            modalOpen: false,
            modalTitle: "",
            modalBody: "",
            modiFlag: false
        })
    }

    onClickDeleteButton = (e) => {
        // console.log(this.state.deleteIdx);
        this.deleteComment(this.state.deleteIdx, this.props.userInfo.X_AUTH_TOKEN)
    }

    onSubmitCommentModifyOk = (e) => {
        e.preventDefault(); 
        this.modifyComment(this.state.modifyIdx, this.props.userInfo.X_AUTH_TOKEN, e.target.modifyTextArea.value);
    }




    render(){
        return(
        this.state.isOk?(
            <React.Fragment>
                <DepositComment 
                    userInfo={this.props.userInfo}
                    commentList={this.state.commentList}  
                    onCommentDelete={this.handleCommentDelete}
                    onCommentCreate={this.handleCommentCreate}
                    onCommentModify={this.handleCommentModify}
                    />
                <Modal show={this.state.modalOpen}>
                    <Form onSubmit={this.onSubmitCommentModifyOk}>
                        <Modal.Header>
                            <Modal.Title>{this.state.modalTitle}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {this.state.modiFlag === false
                            ? 
                                this.state.modalBody
                            :
                                <Form.Group controlId="modifyTextArea">
                                    <Form.Control as="textarea" rows={3} value={this.state.contents} onChange={this.handleCommentModifyChange} />
                                </Form.Group>}
                            </Modal.Body>
                        <Modal.Footer>
                            {this.state.modiFlag === false
                            ?
                                <Button variant="secondary" onClick={this.onClickDeleteButton}>
                                    확인
                                </Button>
                            :
                                <Button variant="secondary" type="submit">
                                    수정
                                </Button>
                            }
                            <Button variant="light" onClick={this.onClickCancelButton}>
                            취소
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
          </React.Fragment>
            ):
                (<img style={{"width": "100%"}} src={loding} alt="loading" />
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
)(DepositCommentContainer);
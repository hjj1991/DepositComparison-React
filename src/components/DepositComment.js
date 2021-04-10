import React from 'react';
import {Container} from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import editIcon from 'images/edit.png';




const DepositComment = ({ commentList, userInfo, onCommentDelete, onCommentCreate, onCommentModify}) => {
    // const userInfo = useSelector(state => state.userLogin.data); //리덕스 스토어의 로그인 유저 데이터 가져오기
    // function WriterAuth(){
    //     console.log(userInfo.nickName);
    //     console.log(boardDetail.creatorId);
    //     if(userInfo.nickName === boardDetail.creatorId){
    //         return (
    //             <React.Fragment>
    //                 <Button variant="outline-secondary" onClick={onClickModify}>수정</Button>
    //                 <Button variant="outline-secondary" >삭제</Button>
    //             </React.Fragment>
    //             );
    //     }else{
    //         return null;
    //     }
    

    // You can get the state of the store using useSelector 
    
    // console.log(userInfo);

    function CreateComment(){
        return (
                <Form onSubmit={onCommentCreate}>
                    <Form.Group controlId="commentTextArea">
                        <Form.Control as="textarea" rows={3}  />
                        <div style={{"textAlign": "right", "marginTop": "10px"}}>
                            <Button variant="outline-secondary" type="submit">등록</Button>
                        </div>
                    </Form.Group>
                </Form>
        )
    }

    function ViewCommentList(){

        return commentList.map((element, i) => {
            if(userInfo.length !== 0 && userInfo.userId === element.creatorId){
                return (
                    <React.Fragment>
                        <Toast style={{maxWidth:"none"}} onClose={(e) => onCommentDelete(e, element)} >
                            <Toast.Header closeButton={true}>
                                <strong className="mr-auto">{element.creatorId}</strong>
                                <small>{element.createdDatetime.replace("T", " ")}</small>
                                &nbsp;&nbsp;
                                <img width="16px" alt="editIcon" src={editIcon} onClick={(e) => onCommentModify(e, element)} />
                            </Toast.Header>
                            <Toast.Body>{element.contents}</Toast.Body>
                        </Toast>
                    </React.Fragment>
                )
            }else{
                return (
                    <React.Fragment>
                        <Toast style={{maxWidth:"none"}} >
                            <Toast.Header closeButton={false}>
                                <strong className="mr-auto">{element.creatorId}</strong>
                                <small>{element.createdDatetime.replace("T", " ")}</small>
                            </Toast.Header>
                            <Toast.Body>{element.contents}</Toast.Body>
                        </Toast>
                    </React.Fragment>
                )
            }

        });
    }
    if(typeof userInfo.userId == "undefined"){
        return (
            <Container>
                    <ViewCommentList/>
            </Container>
        
        );
    }else{
        return (
            <Container>
                    <ViewCommentList/>
                    <CreateComment />
            </Container>
        
        );      
    }
};

export default DepositComment;
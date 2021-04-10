import React from 'react';
import {Container, Row, Col } from 'react-bootstrap'
import { useSelector } from "react-redux";
import { Button } from 'react-bootstrap'




const BoardDetail = ({ boardDetail, onClickModify}) => {
    const userInfo = useSelector(state => state.userLogin.data); //리덕스 스토어의 로그인 유저 데이터 가져오기
    function WriterAuth(){
        console.log(userInfo.nickName);
        console.log(boardDetail.creatorId);
        if(userInfo.nickName === boardDetail.creatorId){
            return (
                <React.Fragment>
                    <Button variant="outline-secondary" onClick={onClickModify}>수정</Button>
                    <Button variant="outline-secondary" >삭제</Button>
                </React.Fragment>
                );
        }else{
            return null;
        }
    }

    // You can get the state of the store using useSelector 
    
    console.log(userInfo);




    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1>게시판</h1>
                </Col>
            </Row>
            <Row>
                <Col className="board-title">{boardDetail.title}</Col>
            </Row>
            <Row className="board-title-toolbar">
                    <Col className="board-title-left col-3">{boardDetail.creatorId}</Col>
                    <Col className="board-title-right col-9">{boardDetail.createdDatetime} | hit:{boardDetail.hitCnt}</Col>
            </Row>
            <Row>
                <Col className="boardContents" dangerouslySetInnerHTML={{__html: boardDetail.contents}}></Col>
            </Row>
            <Row>
                <Col  className="boarder-bottom-toolbox-right">
                    <WriterAuth />
                </Col>
            </Row>
    </Container>
    
    );
};

export default BoardDetail;
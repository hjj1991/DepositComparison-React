import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom';
import 'css/boardStyle.css'




const BoardDetail = ({ boardDetail}) => {

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
    </Container>
    
    );
};

export default BoardDetail;
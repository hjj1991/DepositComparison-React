import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom';




const BoardDetail = ({ boardDetail}) => {

    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1>게시판</h1>
                </Col>
            </Row>
        <div>{boardDetail.title}</div>
    </Container>
    
    );
};

export default BoardDetail;
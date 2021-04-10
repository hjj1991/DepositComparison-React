import React from 'react';
import {Container, Row, Col, Button, ListGroup} from 'react-bootstrap'




const MyInfo = ({userInfo, onClickLogout}) => {

    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1>내정보</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Row>
                                <div className="col-3 info-title">아이디</div>
                                <div className="col-6 info-contents">{userInfo.userId}</div>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <div className="col-3 info-title">이름</div>
                                <div className="col-6 info-contents">{userInfo.name}</div>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <div className="col-3 info-title">이메일주소</div>
                                <div className="col-6 info-contents">{userInfo.email}</div>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <div className="col-3 info-title">가입일</div>
                                <div className="col-6 info-contents">{userInfo.createdDate.replace("T", " ")}</div>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <div className="col-3 info-title">최근로그인</div>
                                <div className="col-6 info-contents">{userInfo.loginDateTime.replace("T", " ")}</div>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item></ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            <Row className="info-footer">
                <Col><Button variant="outline-secondary" onClick={onClickLogout}>로그아웃</Button></Col>
            </Row>
        </Container>
)
};

export default MyInfo;
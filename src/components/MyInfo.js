import React from 'react';
import {Container, Row, Col, Form, Button, ListGroup} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import loding from 'images/loading.gif';




const MyInfo = ({userInfo, isLoading, onClickLogout}) => {

    return (
        isLoading?(
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
                                <div className="col-3 info-title">닉네임</div>
                                <div className="col-6 info-contents">{userInfo.nickName}</div>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <div className="col-3 info-title">이메일주소</div>
                                <div className="col-6 info-contents">{userInfo.emailAddr}</div>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <div className="col-3 info-title">전화번호</div>
                                <div className="col-6 info-contents">{userInfo.tel}</div>
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
                                <div className="col-6 info-contents">{userInfo.loginDate.replace("T", " ")}</div>
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
        ):(
            <img style={{"width": "100%"}} src={loding} />
        )
)
};

export default MyInfo;
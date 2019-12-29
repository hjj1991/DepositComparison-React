import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import './SignUp.css'




const SighIn = ({ }) => {


    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1>로그인</h1>
                </Col>
            </Row>
            <Form onSubmit="">
                <Form.Group controlId="userId"  >
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" placeholder="아이디를 입력하세요" />
                </Form.Group>
                <Form.Group controlId="userPw" >
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 입력하세요."/>
                </Form.Group>
            </Form>
        </Container>
)
};

export default SighIn;
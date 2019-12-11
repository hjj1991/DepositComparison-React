import React from 'react';
import {Container, Row, Col, Form, Button} from 'react-bootstrap'
import './SignUp.css'



const SignUp = ({ checkUserValue, idCheckMessage, idFontColor, pwCheckMessage, pwFontColor, pw2CheckMessage, pw2FontColor }) => {
    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1>회원가입</h1>
                </Col>
            </Row>
            <Form>
                <Form.Group controlId="userId" onChange={checkUserValue} >
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" placeholder="아이디를 입력하세요" />
                    <div style={{"color": idFontColor}}>
                        {idCheckMessage}
                    </div>
                </Form.Group>
                <Form.Group controlId="userPw" onChange={checkUserValue}>
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 입력하세요."/>
                    <div style={{"color": pwFontColor}}>
                        {pwCheckMessage}
                    </div>
                </Form.Group>
                <Form.Group controlId="userPw2" onChange={checkUserValue}>
                    <Form.Label>비밀번호확인</Form.Label>
                    <Form.Control type="password" placeholder="비밀번호를 입력하세요."/>
                    <div style={{"color": pw2FontColor}}>
                        {pw2CheckMessage}
                    </div>
                </Form.Group>
                <Form.Group controlId="userName" >
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" placeholder="이름을 입력하세요" />
                </Form.Group>
                <Form.Group controlId="userNickName" >
                    <Form.Label>별명</Form.Label>
                    <Form.Control type="text" placeholder="별명을 입력하세요" />
                </Form.Group>
                <Form.Group controlId="userEmail">
                    <Form.Label>이메일 주소</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    회원가입
                </Button>
            </Form>
        </Container>
    );
};

export default SignUp;
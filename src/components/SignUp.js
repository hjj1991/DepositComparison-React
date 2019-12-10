import React from 'react';
import {Container, Row, Col, Form} from 'react-bootstrap'
import './SignUp.css'



const SignUp = ({ checkUserId, idCheckMessage, exFontColor }) => {
    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1>회원가입</h1>
                </Col>
            </Row>
            <Form>
                <Form.Group controlId="userId" onChange={checkUserId} >
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" placeholder="아이디를 입력하세요" />
                    <div style={{"color": exFontColor}}>
                        {idCheckMessage}
                        </div>
                </Form.Group>

            </Form>
        </Container>
    );
};

export default SignUp;
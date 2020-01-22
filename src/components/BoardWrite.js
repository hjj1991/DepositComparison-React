import React from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import Modal from '../components/Modal/Modal';
import Pagination from 'react-bootstrap/Pagination'
import { Link, Redirect } from 'react-router-dom';
import 'css/boardStyle.css'
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import { Editor } from '@toast-ui/react-editor'
import 'css/boardStyle.css';




const BoardWrite = ({ writeBoard, isOk}) => {
    
    let editorRef = React.createRef();
    

    return (
        isOk?(
            <Modal isOpen={isOk} contents="글이 작성되었습니다." />
        ):(
            <Container>
                <Row id="title">
                    <Col>
                        <h1>게시판</h1>
                    </Col>
                </Row>
                <Form onSubmit={(e) =>{writeBoard(e, editorRef.current.getInstance().getHtml())} }>
                    <Row>
                        <Col>
                            <Form.Group  controlId="boardTitle">
                                <Form.Control placeholder="제목을 입력해주세요." />
                            </Form.Group>
                        </Col>
                        </Row>
                    <Row>
                        <Col>
                            <Editor
                                initialValue="hello react editor world!"
                                previewStyle="vertical"
                                height="600px"
                                language="ko_KR"
                                initialEditType="wysiwyg"
                                useCommandShortcut={false}
                                ref={editorRef}
                                exts={[
                                    {
                                    name: 'chart',
                                    minWidth: 100,
                                    maxWidth: 600,
                                    minHeight: 100,
                                    maxHeight: 300
                                    },
                                    'scrollSync',
                                    'colorSyntax',
                                    'uml',
                                    'mark',
                                    'table'
                                ]}
                                />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="submit" variant="outline-secondary" size="lg" block>등록</Button>            
                        </Col>
                    </Row>
                </Form>
        </Container>
    )
    );
};

export default BoardWrite;
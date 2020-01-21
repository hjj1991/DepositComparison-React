import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import Modal from '../components/Modal/Modal';
import loading from 'images/loading.gif';
import 'css/boardStyle.css'
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import { Editor } from '@toast-ui/react-editor'
import 'css/boardStyle.css';




const BoardModify = ({ title, contents, onChangeTitleValue, submitModifyBoard, mount, isOk}) => {
    let editorRef = React.createRef();


    return (
        isOk?(
            <Modal isOpen={isOk} />
        ):(
            mount?(         //수정할때 Contents 값이 마운트 되었는지 확인하여 마운트 되면 렌더링 한다.
                <Container>
                    <Row id="title">
                        <Col>
                            <h1>게시판</h1>
                        </Col>
                    </Row>
                    <Form onSubmit={submitModifyBoard}>
                        <Row>
                            <Col>
                                <Form.Group  controlId="boardTitle" >
                                    <Form.Control placeholder="제목을 입력해주세요." onChange={onChangeTitleValue} value={title || ''}/>
                                </Form.Group>
                            </Col>
                            </Row>
                        <Row>
                            <Col>
                                <Editor
                                    initialValue={contents}
                                    previewStyle="vertical"
                                    height="600px"
                                    language="ko_KR"
                                    initialEditType="wysiwyg"
                                    setContent={contents}
                                    useCommandShortcut={false}
                                    ref={editorRef}
                                    exts={[
                                        {
                                        name: 'chart',
                                        minWidth: 100,
                                        maxWidth: 600,
                                        minHeight: 100,
                                        maxHeight: 300
                                        }
                                    ]}
                                    toolbarItems= {[
                                        'heading',
                                        'bold',
                                        'italic',
                                        'colorSyntax',
                                        'strike',
                                        'divider',
                                        'hr',
                                        'quote',
                                        'divider',
                                        'ul',
                                        'ol',
                                        'task',
                                        'indent',
                                        'outdent',
                                        'divider',
                                        'table',
                                        'image',
                                        'link',
                                        'divider',
                                        'code',
                                        'codeblock'
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
            </Container>):(
                <img style={{"width": "100%"}} src={loading} />
            )
        )
    );
};

export default BoardModify;
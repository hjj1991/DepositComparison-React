import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom';
import 'css/boardStyle.css'
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import { Editor } from '@toast-ui/react-editor'




const BoardWrite = ({ toastEditor}) => {
    var editorRef = React.createRef();


    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1 onClick={(e) => console.log(editorRef.current.getInstance().getHtml())}>게시판</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Editor
                        initialValue="hello react editor world!"
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="markdown"
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
    </Container>
    
    );
};

export default BoardWrite;
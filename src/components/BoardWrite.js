import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'css/boardStyle.css'




const BoardWrite = ({ boardDetail}) => {

    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1>게시판</h1>
                </Col>
            </Row>
            <Row>
            <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                />
            </Row>
    </Container>
    
    );
};

export default BoardWrite;
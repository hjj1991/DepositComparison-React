import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap'




const Board = ({boardList}) => {

    const boardItem = boardList.data.results.map((item, index) => {

        return(
            <tr>
                <td>{item.boardIdx}</td>
                <td>{item.title}</td>
                <td>{item.creatorId}</td>
                <td>{item.createdDatetime}</td>
                <td>{item.hitCnt}</td>
            </tr>
        )
    })

    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1>게시판</h1>
                </Col>
            </Row>
        <div className="table-responsive">
            <Table  striped bordered hover variant="dark">
                <thead>
                    <tr>                        
                        <th>번호</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>날짜</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody> 
                    {boardItem}
                </tbody>
            </Table>
        </div>
    </Container>
    
    );
};

export default Board;
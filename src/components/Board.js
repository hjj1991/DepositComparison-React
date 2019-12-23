import React from 'react';
import {Container, Row, Col, Table, Button} from 'react-bootstrap'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom';




const Board = ({ boardList, onClickPage, onClickDetail, currentPage, onClickWrite}) => {
    var firstPage; //첫페이지
    var lastPage; //마지막페이지
    if(currentPage > 5){
        firstPage = currentPage - 4;
        lastPage = currentPage + 4;
        if(lastPage > boardList.pageCount){
            lastPage = boardList.pageCount;
        }
    }else{
        firstPage = 1;
        lastPage = 9;
        if(lastPage > boardList.PageCount){
            lastPage = boardList.pageCount;
        }
    }

    let pageList = [];
    for(; firstPage<=lastPage; firstPage++){ 
        pageList.push(firstPage);
    }  
    const boardItem = boardList.results.map((item, index) => {

        return(
            
                <tr id={index}>
                    
                    <td>{item.boardIdx}</td>
                    {/* <td><Link to={'/board/' + item.boardIdx}>{item.title}</Link></td> */}
                    <td onClick={() => {onClickDetail(item.boardIdx)}}>{item.title}</td>
                    <td>{item.creatorId}</td>
                    <td>{item.createdDatetime}</td>
                    <td>{item.hitCnt}</td>
                    
                </tr>
            
        )
    })
    const PrevPage = () => {
        var prevNum;
        if(Number(currentPage) < 6){
            return <Pagination.Prev disabled />
        }else{
            if(Number(currentPage) - 9 < 1){
                prevNum = 1;
            }else{
                prevNum = Number(currentPage) - 9
            }
            return <li className="page-item"><Link className="page-link" to={'/board?page=' + prevNum}>‹</Link></li>
        }
    }
    const NextPage = () => {
        var nextNum;
        if(Number(currentPage) + 4 < Number(boardList.pageCount)){
            if(Number(currentPage) + 10 > Number(boardList.pageCount)){
                nextNum = boardList.pageCount;
            }else{
                nextNum = Number(currentPage) + 9;
            }
            // console.log("맞잖아");
            // return <Pagination.Next onClick={onClickPage} />
            return <li className="page-item"><Link className="page-link" to={'/board?page=' + nextNum}>›</Link></li>
            
        }else{
            return <Pagination.Next disabled />
        }
    }

    const paginate = pageList.map((item, index) => {
        //console.log("아이템" + item);
        //console.log("중요" + currentPage)
        if(item == currentPage){
    
            return(
                // <Pagination.Item active>{item}</Pagination.Item>
                <Button  variant="secondary"  disabled >{item}</Button>
            )
        }else{
            return(
                // <Pagination.Item onClick={onClickPage}>{item}</Pagination.Item>
                // <li id={index} className="btn btn-secondary"><Link className="page-link" to={'/board?page=' + item}>{item}</Link></li>
                <Button  variant="secondary" onClick={() => {onClickPage(item)}}>{item}</Button>
                // <Pagination.Item></Pagination.Item>
                    //<Pagination.Ellipsis />
                    
                    // <Pagination.Item>{11}</Pagination.Item>
                    // <Pagination.Item active>{12}</Pagination.Item>
                    // <Pagination.Item>{13}</Pagination.Item>
                    // <Pagination.Item disabled>{14}</Pagination.Item>

                    //<Pagination.Ellipsis />

            )
        }

    });

    return (
        <Container>
            <Row id="title">
                <Col>
                    <h1>게시판</h1>
                </Col>
            </Row>
        <div className="table-board">
            <Table  striped  hover>
                <thead>
                    <tr>                        
                        <th style={{"width": "10%"}}>No.</th>
                        <th style={{"width": "50%"}}>제목</th>
                        <th style={{"width": "10%"}}>글쓴이</th>
                        <th style={{"width": "20%"}}>날짜</th>
                        <th style={{"width": "10%"}}>조회수</th>
                    </tr>
                </thead>
                <tbody> 
                    {boardItem}
                </tbody>
            </Table>
            <Row className="boarder-bottom-toolbox">
                <Col className="boarder-bottom-toolbox-left col-6"></Col>
                <Col className="boarder-bottom-toolbox-right col-6"><Button variant="outline-secondary" onClick={onClickWrite}>글쓰기</Button></Col>
            </Row>
            <Pagination>
                <ButtonGroup className="mr-2" aria-label="First group">
                <PrevPage />
                {paginate}
                <NextPage />
                </ButtonGroup>
            </Pagination>
        </div>
    </Container>
    
    );
};

export default Board;
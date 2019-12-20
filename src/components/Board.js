import React from 'react';
import {Container, Row, Col, Table} from 'react-bootstrap'
import Pagination from 'react-bootstrap/Pagination'
import { Link } from 'react-router-dom';




const Board = ({history, boardList, onClickPage, currentPage}) => {
    console.log("하이롱" + history);
    console.log("하이롱2" + boardList);
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
            <tr>
                <td>{item.boardIdx}</td>
                <td>{item.title}</td>
                <td>{item.creatorId}</td>
                <td>{item.createdDatetime}</td>
                <td>{item.hitCnt}</td>
            </tr>
        )
    })
    const PrevPage = () => {
        console.log(currentPage);
        if(currentPage < 6){
            return <Pagination.Prev disabled />
        }else{
            return <Pagination.Prev onClick={onClickPage} />
        }
    }
    const NextPage = () => {
        if(currentPage + 4 < boardList.pageCount){
            return <Pagination.Next onClick={onClickPage} />
            
        }else{
            return <Pagination.Next disabled />
        }
    }

    const paginate = pageList.map((item, index) => {
        //console.log("아이템" + item);
        //console.log("중요" + currentPage)
        let urlPath = '/board?page=' + item + '&pageSize=10'
        if(item == currentPage){
            console.log("이거 같음");
            return(
                <Pagination.Item active>{item}</Pagination.Item>
            )
        }else{
            return(
                <Pagination.Item onClick={onClickPage}>{item}</Pagination.Item>
                // <li className="page-item"><Link className="page-link" to={urlPath}>{item}</Link></li>
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
            <Pagination>
                <PrevPage />
                {paginate}
                <NextPage />
            </Pagination>
        </div>
    </Container>
    
    );
};

export default Board;
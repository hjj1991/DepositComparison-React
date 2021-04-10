import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import carouselImg_01 from 'images/carouselImg_01.jpg'
import carouselImg_02 from 'images/carouselImg_02.jpg'
import carouselImg_03 from 'images/carouselImg_03.jpg'
import * as service from 'services/posts';
import {  Row } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import depositImg from 'images/deposit.png'
import investmentImg from 'images/investment.png'


function RequestInvestmentAndDeposit() {
  const [investmentData, setinvestmentData] = useState(null);
  const [depositData, setDepositData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
    try {
      setLoading(true);
        const post = await service.getTopInstallmentSavingList(10);
        const post2 = await service.getTopDepositSavingList(10);
        // console.log(post.data);
        if(post.data.success === true && post2.data.success === true){
          setinvestmentData(post.data);
          setDepositData(post2.data);
        }
        
    } catch(e) {
        console.log('에러가 발생!');
    }

    setLoading(false);
  }
  fetchData();
}, []);

  return [investmentData, depositData, loading]
    
}

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          id="carousel1"
          className="d-block w-100"
          src={carouselImg_01}
          alt="First slide"
          
        />
        <Carousel.Caption>
          <h3>티끌모아 티끌인가요?</h3>
          <p>적금으로 티끌을 모아 <br/>태산을 만들어볼까요?</p>
          <a href="/saving/installment"><button id="customButton">적금보러가기</button></a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          id="carousel2"
          className="d-block w-100"
          src={carouselImg_02}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>목돈으로 뭘 할지 감이 안잡시죠?</h3>
          <p>예금 이율 확인하고 목돈을 굴려봅시다!</p>
          <a href="/saving/deposit"><button id="customButton">예금보러가기</button></a>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          id="carousel3"
          className="d-block w-100"
          src={carouselImg_03}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>예금,적금에 댓글을 달아 의견을 나눠보아요</h3>
          <p>
            카카오,네이버 로그인으로 <br />
            손쉽게 가입해봅시다!
          </p>
          <a href="/signin"><button id="customButton">로그인하기</button></a>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function ViewList(){

  const [investmentData, depositData, loading] = RequestInvestmentAndDeposit();

    
  if(loading) {
    return <div>로딩중...</div>
  }

  if(!(investmentData && depositData)) return "하이";

  
  const investItem = investmentData.list.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{item.korCoNm}</td>
        <td>{item.finPrdtNm}</td>
        <td>{item.optionList[0].intrRate}</td>
        <td>{item.optionList[0].intrRate2}</td>
      </tr>
    )
  });

  const depositItem = depositData.list.map((item, index) => {
    return (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{item.korCoNm}</td>
        <td>{item.finPrdtNm}</td>
        <td>{item.optionList[0].intrRate}</td>
        <td>{item.optionList[0].intrRate2}</td>
      </tr>
    )
  });

  return (
    
      <Row style={{margin: "5px"}}>
        <div className="col-12 col-md-6">
          <div style={{textAlign:"center"}}>
            <img width="50px" style={{paddingBottom:"20px"}} src={investmentImg} alt="investmentImg" /> 
            <span className="home-menu">적금이율순위 TOP 10</span>
          </div>
          <Table striped bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th>순위</th>
                <th>금융회사</th>
                <th>상품명</th>
                <th>이율</th>
                <th>최고우대금리</th>
              </tr>
            </thead>
            <tbody>
              {investItem}
            </tbody>
          </Table>
        </div>
        <div className="col-12 col-md-6">
          <div style={{textAlign:"center"}}>
            <img width="50px" style={{paddingBottom:"20px"}} src={depositImg} alt="depositImg" /> 
            <span className="home-menu">예금이율순위 TOP 10</span>
          </div>
          <Table striped bordered hover size="sm" variant="dark">
              <thead>
                <tr>
                  <th>순위</th>
                  <th>금융회사</th>
                  <th>상품명</th>
                  <th>이율</th>
                  <th>최고우대금리</th>
                </tr>
              </thead>
              <tbody>
                {depositItem}
              </tbody>
            </Table>
        </div>
      </Row>
    
  )
}


const Home = ({userInfo, isLoading, onClickLogout}) => {

      
      return (
        <React.Fragment>
          <ControlledCarousel />
          <ViewList />
        </React.Fragment>
        );
};

export default Home;
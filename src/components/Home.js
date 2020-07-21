import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import carouselImg_01 from 'images/carouselImg_01.jpg'
import carouselImg_02 from 'images/carouselImg_02.jpg'
import carouselImg_03 from 'images/carouselImg_03.jpg'
import { Redirect } from 'react-router-dom';
import loding from 'images/loading.gif';




const Home = ({userInfo, isLoading, onClickLogout}) => {
    function ControlledCarousel() {
        const [index, setIndex] = useState(0);
      
        const handleSelect = (selectedIndex, e) => {
          setIndex(selectedIndex);
          console.log(selectedIndex);
          console.log("안녕");
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
                <p>그렇지 않습니다. 열심히 모으면 기분이 좋잖아요?</p>
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
                <h3>꿀꿀!</h3>
                <p>적금과 예금이율을 확인해 보시고 싶으시죠?~!</p>
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
                <h3>돈이 쌓이고있어요.</h3>
                <p>
                  동전이 가득가득 얼마나 될까요?
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        );
      }
      
      return (<ControlledCarousel />);
};

export default Home;
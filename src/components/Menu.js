import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SignInContainer from 'containers/SignInContainer';
import 'css/style.css';
// import {render} from 'react-dom';
// import logo from '../logo.png' //실제 로고파일 경로



const Menu = () => {

    const [loginShow, setloginShow] = useState(false);
    const userInfo = useSelector(state => state.userLogin.data); //리덕스 스토어의 로그인 유저 데이터 가져오기
    console.log(userInfo);
    function LoginCheck(){
        console.log(typeof userInfo.nickName);
        if(typeof userInfo.nickName == "undefined"){
            return (
                <React.Fragment>
                    <NavLink className="nav-link" to="/signin">Login</NavLink>
                    <NavLink className="nav-link" to="/signup" >SignUp</NavLink>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                    <div id="user-bar">환영합니다.{userInfo.nickName}님</div>
                </React.Fragment>
            )
        }
    }
  
    
    useEffect(() => {
        setloginShow(true);
      }, []);
    const handleOpen = () => setloginShow(true);
        


    // const array = ['dog', 'cat', 'sheep'];
// const [first, second] = array;
//console.log(setShow); // dog cat

    return (
        <section>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <NavLink className="navbar-brand" to="/"><img alt="" width="30"  className="d-inline-block align-top"/>{' HOME'}</NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                <NavLink className="nav-link" to="/board" >Board</NavLink>
                {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown> */}
                </Nav>
                <Nav>
                    <LoginCheck />
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            {/* <div>
                <ul>
                    <li><NavLink exact to="/" activeStyle={activeStyle}>Dashboard</NavLink></li>
                    <li><NavLink exact to="/about" activeStyle={activeStyle}>Workloads</NavLink></li>
                    <li><NavLink to="/about/foo" activeStyle={activeStyle}>Targets</NavLink></li>
                    <li><NavLink to="/posts" activeStyle={activeStyle}>Tasks</NavLink></li>
                </ul>
                <hr/>
            </div> */}
        </section>
    );
};



export default Menu;
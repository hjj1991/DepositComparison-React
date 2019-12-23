import React from 'react';
import Board from 'components/Board';
import * as service from 'services/posts'
import {browserHistory} from 'react-router-dom';
import loding from 'images/loading.gif';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class BoardContainer extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            pending: false,
            isOk: false,
            currentPage: 1,
            pageSize: 10
        };
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    //     return true;
    //}

    componentDidUpdate(prevProps, prevState) {
        // if(typeof this.props.page == "undefined"){
        //     this.getPost(1,10);
        // }
        if (this.props.page !== prevProps.page){
            this.getPost(this.props.page,10);
        }
        // console.log(this.props.page);
      }

    componentDidMount() {
        console.log("마운트");
        console.log(this.props);
        if(typeof this.props.page == "undefined"){
            this.getPost(1, 10);
        }else{
            this.getPost(this.props.page, 10);
        }
        // setTimeout(() => {
        //     this.setState({ isOk: true});
        // }, 600);   
      }
    //   static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log("드리븐");
    //     console.log(prevState.boardList);
    //     console.log(nextProps);
    //     console.log(JSON.parse(window.history.state.data));
    //     if (prevState.currentPage !== nextProps.page) {
            
    //       return { 
    //           boardList: JSON.parse(window.history.state.data),
    //         //   currentPage: nextProps.page,
    //         //   pageSize: nextProps.pageSize
    //         };
    //     }
        
    //     return true;
    // }

    getPost = async (page, pageSize) => {
        try {
            const post = await service.getBoardList(page, pageSize);
            // console.log(post);
            this.setState({
                boardList: post,
                isOk: true,
                currentPage: page
            });
            
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    };



    handleChangePage = (indx) => {
        // console.log(e.target.text);
        // this.context.router.transitionTo('/board/'+indx);
        // browserHistory.push('/board/'+indx);
        // console.log(e.target);
        this.props.history.push('/board?page=' + indx);
        // this.router.transitionTo('/board/'+indx);
    }

    handleDetailPage = (indx) => {
        // console.log(e.target.text);
        // this.context.router.transitionTo('/board/'+indx);
        // browserHistory.push('/board/'+indx);
        // console.log(e.target);
        this.props.history.push('/board/'+ indx);
        // this.router.transitionTo('/board/'+indx);
    }


    handleWriteBoard = () => {
        this.props.history.push('/board/write');
    }



    render(){
        // this.getPost(this.props.page, this.props.pageSize);
        // var boardList = getPost(1, 20);
        return(
        this.state.isOk?(<Board 
                boardList={this.state.boardList.data}
                onClickPage={this.handleChangePage}
                onClickDetail={this.handleDetailPage}
                currentPage={this.state.currentPage}
                onClickWrite={this.handleWriteBoard}
                />):
                <img style={{"width": "100%"}} src={loding} />
    
        )
    }

}

export default BoardContainer;
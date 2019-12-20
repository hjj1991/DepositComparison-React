import React from 'react';
import Board from 'components/Board';
import * as service from 'services/posts'

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


    componentWillMount(){
        console.log("componentWillMount");
      }

    // shouldComponentUpdate(nextProps, nextState){
    //     console.log("shouldComponentUpdate: " + JSON.stringify(nextProps) + " " + JSON.stringify(nextState));
    //     return true;
    //}

    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!')
        console.log(prevProps);
        console.log(prevState);
        console.log(JSON.parse(window.history.state.data).boardList);
        // this.state = JSON.parse(window.history.state.data);
      }

    componentDidMount() {
        console.log("마운트");
        console.log(this.props);
        if(typeof this.props.page == "undefined" || typeof this.props.pageSize == "undefined"){
            this.getPost(1, 10);
        }else{
            this.getPost(this.props.page, this.props.pageSize);
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

    shouldComponentUpdate(nextProps, nextState){
        // console.log("shuhuhu");
        console.log(JSON.parse(window.history.state.data));
        nextState = JSON.parse(window.history.state.data);
        console.log(nextState);
        return true;
      }


    getPost = async (page, pageSize) => {
        try {
            const post = await service.getBoardList(page, pageSize);
            console.log(post);
            this.setState({
                boardList: post,
                isOk: true,
                currentPage: page
            });
            
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    };



    handleChangePage = (e) => {
        console.log(e.target.text);
        // console.log("계산이다:" + (this.state.currentPage - 9 < 1));
        var currentPage = document.getElementsByClassName("page-item active");
        
        
        this.setState({
            isOk: false
        })
        if(e.target.text === "‹Previous"){
            if(this.state.currentPage - 9 < 1){
                this.getPost(1, 10);
            }else{
                this.getPost(this.state.currentPage - 9, 10);
            }
        }else if(e.target.text === "›Next"){
            console.log(this.state.boardList.data.pageCount);
            if(this.state.currentPage + 10 > this.state.boardList.data.pageCount){
                this.getPost(this.state.boardList.data.pageCount, 10);
            }else{
                this.getPost(this.state.currentPage + 9);
            }
        }else{
            // this.props.history.replace(this.state);
            this.getPost(e.target.text, 10);
            // console.log(this.props.history.replace);

            // this.props.history.
            // this.props.history.pushState({boardList: this.state.boardList});
            window.history.pushState({data: JSON.stringify(this.state)}, '', '/board?page=' + e.target.text + '&pageSize=10');
            // this.props.history.push('/board?page=' + e.target.text + '&pageSize=10');

        }
    }



    render(){
        console.log("페이지:" + this.props.page);
        console.log(this.props.pageSize);
        console.log(this.state.boardList);
        // this.getPost(this.props.page, this.props.pageSize);
        // var boardList = getPost(1, 20);
        return(
        this.state.isOk?(<Board 
                boardList={this.state.boardList.data}
                onClickPage={this.handleChangePage}
                currentPage={this.state.currentPage}
                />):
                <div>로딩중</div>
        
        )
    }

}

export default BoardContainer;
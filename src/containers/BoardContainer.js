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
            currentPage: 1
        };
    }

    componentDidMount() {
        console.log(this.props)
        if(typeof this.props.page == "undefined" || typeof this.props.pageSize == "undefined"){
            this.getPost(1, 10);
        }else{
            this.getPost(this.props.page, this.props.pageSize);
        }
        // setTimeout(() => {
        //     this.setState({ isOk: true});
        // }, 600);   
      }

    componentWillReceiveProps(nextProps){
        this.setState({
            isOk: false
        }, () => {this.getPost(this.props.page, this.props.pageSize)});
        
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
            this.getPost(e.target.text, 10);
        }
    }



    render(){
        console.log(this.props.page);
        console.log(this.props.pageSize);
        // this.getPost(this.props.page, this.props.pageSize);
        // var boardList = getPost(1, 20);
        return(
        this.state.isOk?(<Board 
                boardList={this.state.boardList}
                onClickPage={this.handleChangePage}
                currentPage={this.props.page}
                />):
                <div>로딩중</div>
        
        )
    }

}

export default BoardContainer;
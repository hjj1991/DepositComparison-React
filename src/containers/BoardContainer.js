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

    componentDidUpdate(prevProps, prevState) {                  //props 변화에 따라 기존 컴포넌트의 업데이트 진행 함수
        if (this.props.page !== prevProps.page || this.props.searchTarget !== prevProps.searchTarget || this.props.searchKeyword !== prevProps.searchKeyword){
            this.getPost(this.props.page,10, this.props.searchTarget, this.props.searchKeyword);
        }
      }

    componentDidMount() {
        if(typeof this.props.page == "undefined"){
            this.getPost(1, 10);
        }else{
            this.getPost(this.props.page, 10, this.props.searchTarget, this.props.searchKeyword);
        }
      }


    getPost = async (page, pageSize, searchTarget, searchKeyword) => {
        try {
            const post = await service.getBoardList(page, pageSize, searchTarget, searchKeyword);
            // console.log(post);
            this.setState({
                boardList: post,
                isOk: true,
                currentPage: page,
                searchTarget: searchTarget,
                searchKeyword: searchKeyword
            });
            
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    };



    handleChangePage = (indx, searchTarget, searchKeyword) => {
        if(typeof searchKeyword !== "undefined"){
            this.props.history.push('/board?page=' + indx + '&searchTarget=' + searchTarget + '&searchKeyword=' + searchKeyword);
        }else{
            this.props.history.push('/board?page=' + indx);
        }
    }

    handleDetailPage = (indx) => {
        this.props.history.push('/board/'+ indx);
    }

    handleSearch = (e) => {
        e.preventDefault();
        console.log(e.target.searchTarget.value);
        console.log(e.target.searchKeyword.value);
        if(e.target.searchKeyword.value.replace(/(\s*)/g, "").length < 2){
            alert("공백제외 두글자 이상 검색 가능합니다.");
        }else{
            this.props.history.push('/board?page=1&searchTarget=' + e.target.searchTarget.value + '&searchKeyword=' + e.target.searchKeyword.value);
        }
    }

    handleSearchKeywordChange = (e) => {
        this.setState({
            searchKeyword: e.target.value
        })
    }

    handleSearchTargetChage = (e) => {
        this.setState({
            searchTarget: e.target.value
        })
    }
    

    handleWriteBoard = () => {
        this.props.history.push('/board/write');
    }

    



    render(){
        return(
        this.state.isOk?(<Board 
                boardList={this.state.boardList.data}
                onClickPage={this.handleChangePage}
                onClickDetail={this.handleDetailPage}
                onClickWrite={this.handleWriteBoard}
                onClickSearch={this.handleSearch}
                onChangeSearchTarget={this.handleSearchTargetChage}
                onChageSearchKeyword={this.handleSearchKeywordChange}
                currentPage={this.state.currentPage}
                searchTarget={this.state.searchTarget}
                searchKeyword={this.state.searchKeyword}
                />):
                <img style={{"width": "100%"}} src={loding} />
    
        )
    }

}

export default BoardContainer;
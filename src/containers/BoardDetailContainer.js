import React from 'react';
import BoardDetail from 'components/BoardDetail';
import * as service from 'services/posts'

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class BoardDetailContainer extends React.Component {

    
    constructor(props) {
        super(props);
        this.state = {
            pending: false,
            isOk: false,
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
            this.getPost(this.props.detailIndx);
        }
        // setTimeout(() => {
        //     this.setState({ isOk: true});
        // }, 600);   

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

    getPost = async (indx) => {
        try {
            const post = await service.getBoardDetail(indx);
            console.log(post);
            this.setState({
                boardDetail: post,
                isOk: true
            });
            
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    };



    handleChangePage = (e) => {
        console.log(e.target.text);
        // console.log("계산이다:" + (this.state.currentPage - 9 < 1));
        // var currentPage = document.getElementsByClassName("page-item active");
        
        
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
            // window.history.pushState({data: JSON.stringify(this.state)}, '', '/board?page=' + e.target.text + '&pageSize=10');
            // this.props.history.push('/board?page=' + e.target.text + '&pageSize=10');

        }
    }



    render(){
        // this.getPost(this.props.page, this.props.pageSize);
        // var boardList = getPost(1, 20);
        return(
        this.state.isOk?(<BoardDetail 
                boardDetail={this.state.boardDetail.data}
                onClickPage={this.handleChangePage}
                />):
                <div>로딩중</div>
        
        )
    }

}

export default BoardDetailContainer;
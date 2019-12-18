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
        this.getPost(this.state.currentPage, 10);
        // setTimeout(() => {
        //     this.setState({ isOk: true});
        // }, 600);   
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
        if(e.target.text === "‹Previous"){

        }else if(e.target.text === ">Next"){

        }else{
            this.getPost(e.target.text, 10);
        }
    }



    render(){
        // var boardList = getPost(1, 20);
        return(
        this.state.isOk?(<Board 
                boardList={this.state.boardList}
                onClickPage={this.handleChangePage}
                currentPage={this.state.currentPage}
                />):
                <div>로딩중</div>
        
        )
    }

}

export default BoardContainer;
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
            isOk: false
        };
    }

    componentDidMount() {
        this.getPost(1, 10);
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
                isOk: true
            });
            
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    };


    render(){
        // var boardList = getPost(1, 20);
        return(
        this.state.isOk?(<Board 
                boardList={this.state.boardList}
                />):
                <div>하이루</div>
        
        )
    }

}

export default BoardContainer;
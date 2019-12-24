import React from 'react';


import BoardWrite from 'components/BoardWrite';
import * as service from 'services/posts'
import loding from 'images/loading.gif';
import 'codemirror/lib/codemirror.css';


// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class BoardWriteContainer extends React.Component {


    constructor(){
        super();
        this.state = {
            pending: false,
            isOk: false,
            isModalOpen: false
        };
    };

    componentDidMount() {
    
    }

    postBoardInsert = async (data) => {
        try {
            const result = await service.postBoardInsert(data);

            // console.log(result);
            if(result.status === 200){
                this.setState({
                    isOk: true
                });
        }
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    };

    handleWriteBoard = (e, contents) =>{
        e.preventDefault(); 
        
        // console.log(contents);
        let data = {
            "title": e.target.boardTitle.value,
            "contents": contents
        }

        this.postBoardInsert(data);

        // console.log(data);
    }

    render(){
        // this.getPost(this.props.page, this.props.pageSize);
        // var boardList = getPost(1, 20);
        return(
        <BoardWrite 
            writeBoard={this.handleWriteBoard}
            isOk={this.state.isOk}
        />
        )};

}

export default BoardWriteContainer;
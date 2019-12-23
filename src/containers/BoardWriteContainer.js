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
            content : ''
        };
    };

    componentDidMount() {
        }


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



    render(){
        // this.getPost(this.props.page, this.props.pageSize);
        // var boardList = getPost(1, 20);
        return(
        <BoardWrite 
        />
        
        )
    };

}

export default BoardWriteContainer;
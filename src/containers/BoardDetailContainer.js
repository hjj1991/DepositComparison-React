import React from 'react';
import BoardDetail from 'components/BoardDetail';
import * as service from 'services/posts'
import loding from 'images/loading.gif';

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

    componentDidMount() {
            this.getPost(this.props.detailIndx);
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
        this.state.isOk?(<BoardDetail 
                boardDetail={this.state.boardDetail.data}
                onClickPage={this.handleChangePage}
                />):
                <img style={{"width": "100%"}} src={loding} />
        
        )
    }

}

export default BoardDetailContainer;
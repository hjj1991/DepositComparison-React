import React from 'react';
import MyInfo from 'components/MyInfo';
import { bindActionCreators } from 'redux';
import * as service from 'services/posts'
import { connect } from 'react-redux';
import * as loginOkActions from 'store/modules/userLogin';
import storage from 'lib/storage';
import Modal from '../components/Modal/Modal';
import LoadingOverlay from 'react-loading-overlay';
import Home from 'pages/Home';


class SocialLoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            pending: false

        };
    }
    

    componentDidMount() {
            this.getPost();
    }

    getPost = async () => {
        const { LoginOkActions } = this.props;
        try {
            this.setState({
                pending: true
            })
            const data = await service.postLoginToKakao(this.props.data);
            console.log(data);
            if(data.data.success){
                LoginOkActions.setLoggedInfo(data.data.data);
                storage.set('userLogin', data.data.data);

            }
            this.setState({
                data: data,
                pending: false,
                msg: data.data.msg,
                success: data.data.success
            });
            
            
        } catch(e) {
            console.log('에러가 발생!');
        }
    }


    render(){
        console.log(this.state.isLoading);
        return(
            <LoadingOverlay
            active={this.state.pending}
            spinner
            text='잠시만 기다려주세요...'
            styles={{
                overlay: (base) => ({
                ...base,
                "position": "fixed",
                "width": "100%",
                "height": "100%",
                "left": "0",
                "z-index": "10"
                })
            }}
            >
            <Home
            />
        </LoadingOverlay>
        )
    }

}

export default connect(
    (state) => ({
    }),
    (dispatch) => ({
        LoginOkActions: bindActionCreators(loginOkActions, dispatch)
    })
)(SocialLoginContainer);
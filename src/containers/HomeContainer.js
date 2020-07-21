import React from 'react';
import Home from 'components/Home';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userInfoActions from 'store/modules/userLogin';


class HomeContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            pending: false

        };
    }

    render(){
        return(
            <Home />
        )
    }

}

let mapStateToProps = (state) => {
    return {
        userInfo: state.userLogin.data
    };
}
const mapDispatchToProps = dispatch => ({
    UserInfoActions: bindActionCreators(userInfoActions, dispatch),
    // AnotherActions: bindActionCreators(anotherActions, dispatch)
  });



export default connect(
    mapStateToProps,     
    mapDispatchToProps
)(HomeContainer);
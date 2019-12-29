import React from 'react';
import SignIn from 'components/SignIn';
import * as service from 'services/posts'

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as checkUserIdActions from '../store/modules/checkUserId';



class SignInContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <SignIn
            />
        )
    }

}

export default SignInContainer;
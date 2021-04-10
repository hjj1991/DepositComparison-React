import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Deposit from 'components/Deposit';
import * as depositActions from 'store/modules/deposit';
import loding from 'images/loading.gif';


class DepositContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            data: [],
            pending: false

        };
    }

    handleChangeType = (e) => {
        // e.currentTarget.totalSaveMoney.value = e.currentTarget.totalSaveMoney.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const { DepositActions } = this.props;
        DepositActions.setDepositDataChange(e.currentTarget);
        // console.log(e.currentTarget.totalSaveMoney);
        
    }

    getDepositListFunction = async () => {
        const { DepositActions } = this.props;
        try{
            await DepositActions.getDepositList();
        } catch(e) {
            // console.log("에러발생");
        }
        
    }

    componentDidMount() {
        this.getDepositListFunction();
        
        
      }

    render(){
        const { success, depositList} = this.props;
        return(
            success?
            <Deposit 
                depositList={depositList}
                onChangeType={this.handleChangeType}
            />
            :<img style={{"width": "100%"}} src={loding} alt="loading" />
        )
    }

}

let mapStateToProps = (state) => {
    return {
        depositList: state.deposit.filterData,
        pending: state.pender.pending['GET_DEPOSIT_LIST'],
        success: state.pender.success['GET_DEPOSIT_LIST'],
        error: state.pender.failure['GET_DEPOSIT_LIST']
    };
}
const mapDispatchToProps = dispatch => ({
    DepositActions: bindActionCreators(depositActions, dispatch),
  });



export default connect(
    mapStateToProps,     
    mapDispatchToProps
)(DepositContainer);
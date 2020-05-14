import React, { useRef, Fragment } from 'react'
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';


const InstallmentSaving = ({ installmentSavingList, onChangeType }) => {


  const inputEl = useRef(null);
  const products = installmentSavingList;
  const columns = [
    {
      dataField: 'korCoNm',
      text: '금융회사',
      sort: true,
      headerAlign: 'center',
      align: 'center'
    },
    {
      dataField: 'finPrdtNm',
      text: '상품명',
      sort: true,
      headerAlign: 'center'
    },
    {
        dataField: 'optionList',
        text: '방식',
        headerAlign: 'center',
        align: 'center',
        sort: true,
        formatter: (cell, row, index, extraData) => {
            var jau = 0, jung = 0;
            for(var i = 0; i < cell.length; i++){
                if(cell[i].rsrvTypeNm === "정액적립식")
                    jung++;
                if(cell[i].rsrvTypeNm === "자유적립식")
                    jau++;
            }
            if(jau > 0 && jung > 0)
                return "자유/정액 적립식";
            else if(jau > 0 && jung === 0)
                return "자유 적립식";
            else if(jau === 0 && jung > 0)
                return "정액 적립식";
            else
                return "";
            
        }
    },

  ];

  const selectRow = {
    mode: 'checkbox',
    clickToSelect: false,
    // onSelect: (row, isSelect, rowIndex, e) => {
    //     console.log(row);
    //     console.log(isSelect);
    //     console.log(rowIndex);
    //     console.log(e);
    // },
    clickToExpand: true
  };

  const expandRow = {
    onlyOneExpanding: true,
    showExpandColumn: false,
    renderer: row => {
      return (
        <Container>
            {row.korCoNm}
        </Container>
      )
    }

  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing { from} to { to} of { size} Results
    </span>
  );

  const paginationOptions = {
    custom: true,
    paginationSize: 5,
    pageStartIndex: 1,
    withFirstAndLast: false,
    // alwaysShowAllBtns: true, // Always show next and previous button
    // withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
    // hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: 'First',
    prePageText: 'Back',
    nextPageText: 'Next',
    lastPageText: 'Last',
    nextPageTitle: 'First page',
    prePageTitle: 'Pre page',
    firstPageTitle: 'Next page',
    lastPageTitle: 'Last page',
    showTotal: true,
    totalSize: products.length,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
      {
        text: '10', value: 10
      }, {
        text: 'All', value: products.length
      }] // A numeric array is also available. the purpose of above example is custom the text
  };

  const MySearch = (props) => {
    let input;
    const handleChange = () => {
      props.onSearch(input.value);
    };
    return (
      <input
        className="form-control"
        placeholder="검색어를 입력해주세요."
        size="15"
        //   style={ { backgroundColor: 'pink' } }
        ref={n => input = n}
        type="text"
        onChange={handleChange}
      />
    );
  };

  return (
    <div className="container-fluid">
      <div className="main-contents" >
        <p className="main-contents-title"><b>적금</b></p>
        <Fragment>
          <PaginationProvider
            pagination={
              paginationFactory(paginationOptions)
            }
          >
            {
              ({
                paginationProps,
                paginationTableProps
              }) => (
                  <Fragment>
                    <ToolkitProvider
                      keyField='workloadId'
                      columns={columns}
                      data={products}
                      search
                    >
                      {
                        toolkitprops => (
                          <Fragment>
                            <hr />
                            <Form onChange={(value, e) => {onChangeType(value, e)}} >
                              <Row>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">월 저축 금액</div>
                                    <div className="col-7">
                                      <input className="form-control" type="text"/>
                                    </div>
                                  </Row>
                                </div>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">총 저축 금액</div>
                                    <div className="col-7">
                                      <input className="form-control" type="text"/>
                                    </div>
                                  </Row>
                                </div>
                              </Row>
                              <Row>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">저축 예정기간</div>
                                    <div className="col-7">
                                    <ToggleButtonGroup type="radio" name="saveTrm"  defaultValue={12}>
                                      <ToggleButton variant="outline-warning" value={6}>6개월</ToggleButton>
                                      <ToggleButton variant="outline-warning" value={12}>12개월</ToggleButton>
                                      <ToggleButton variant="outline-warning" value={24}>24개월</ToggleButton>
                                      <ToggleButton variant="outline-warning" value={36}>36개월</ToggleButton>
                                    </ToggleButtonGroup>
                                    </div>
                                  </Row>
                                </div>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">가입대상</div>
                                    <div className="col-7">
                                    <ToggleButtonGroup type="radio" name="joinDeny" defaultValue={1}>
                                      <ToggleButton variant="outline-warning" value={1}>제한없음</ToggleButton>
                                      <ToggleButton variant="outline-warning" value={2}>서민전용</ToggleButton>
                                      <ToggleButton variant="outline-warning" value={3}>일부제한</ToggleButton>
                                    </ToggleButtonGroup>
                                    </div>
                                  </Row>
                                </div>
                              </Row>                          
                              <Row>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">
                                      적립방식
                                    </div>
                                    <div className="col-7">
                                      <ToggleButtonGroup type="radio" name="rsrvTypeNm" defaultValue="">
                                        <ToggleButton variant="outline-warning" value="">전체</ToggleButton>
                                        <ToggleButton variant="outline-warning" value="정액적립식">정액적립식</ToggleButton>
                                        <ToggleButton variant="outline-warning" value="자유적립식">자유적립식</ToggleButton>
                                      </ToggleButtonGroup>
                                    </div>
                                  </Row>
                                </div>
                                <div className="col-12 col-md-12 col-xl-6">
                                  <Row>
                                    <div className="col-5 saving-title">
                                      금융권역
                                    </div>
                                    <div className="col-7">
                                      <ToggleButtonGroup type="radio" name="bankRole" defaultValue="">
                                        <ToggleButton variant="outline-warning" value="">전체</ToggleButton>
                                        <ToggleButton variant="outline-warning" value="은행">은행</ToggleButton>
                                        <ToggleButton variant="outline-warning" value="저축은행">저축은행</ToggleButton>
                                      </ToggleButtonGroup>
                                    </div>                                  
                                  </Row>
                                </div>
                              </Row>
                            </Form>
                            <hr />
                            <div>
                              <MySearch {...toolkitprops.searchProps} />
                            </div>
                            <hr />
                            <SizePerPageDropdownStandalone {...paginationProps} />
                            <BootstrapTable classes="workload-table"
                              bordered={false}
                              {...toolkitprops.baseProps}
                              {...paginationTableProps}
                              selectRow={selectRow}
                              expandRow={expandRow}
                            />
                            <PaginationTotalStandalone

                              {...paginationProps} />

                            <PaginationListStandalone {...paginationProps} />
                          </Fragment>
                        )
                      }
                    </ToolkitProvider>

                  </Fragment>
                )
            }
          </PaginationProvider>
        </Fragment>
      </div>
    </div>
  )
}
export default InstallmentSaving;
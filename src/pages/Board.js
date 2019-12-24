import React from 'react';
import BoardContainer from 'containers/BoardContainer';
import queryString from 'query-string';

const Board = ({location, history}) => {

    const query = queryString.parse(location.search);
    let page = query.page;
    let searchTarget = query.searchTarget;
    let searchKeyword = query.searchKeyword;
    console.log(query);
    // const pageSize = query.pageSize;
    // console.log(query);
    // console.log("야호 ");
    // console.log(history);
    if (typeof query.page == "undefined"){
        page = 1;
    }
    return (
        <BoardContainer
            page={page}
            searchTarget={searchTarget}
            searchKeyword={searchKeyword}
            // pageSize={pageSize}
            history={history}
        />
    );
};

export default Board;
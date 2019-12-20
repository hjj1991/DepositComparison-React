import React from 'react';
import BoardContainer from 'containers/BoardContainer';
import queryString from 'query-string';

const Board = ({location, history}) => {

    const query = queryString.parse(location.search);
    const page = query.page;
    const pageSize = query.pageSize;
    console.log(query);
    console.log("야호 ");
    console.log(history);
    return (
        <BoardContainer
            page={page}
            pageSize={pageSize}
            history={history}
        />
    );
};

export default Board;
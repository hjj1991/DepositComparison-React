import React from 'react';
import BoardContainer from 'containers/BoardContainer';
import queryString from 'query-string';

const Board = ({location}) => {

    const query = queryString.parse(location.search);
    const page = query.page;
    const pageSize = query.pageSize;
    console.log(query);
    return (
        <BoardContainer
            page={page}
            pageSize={pageSize}
        />
    );
};

export default Board;
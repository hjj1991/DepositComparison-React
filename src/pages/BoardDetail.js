import React from 'react';
import BoardDetailContainer from 'containers/BoardDetailContainer';

const BoardDetail = ({match}) => {

    return (
        <BoardDetailContainer
            detailIndx={match.params.name} />
        // <BoardDetailContainer
        //     page={page}
        //     // pageSize={pageSize}
        // />
    );
};

export default BoardDetail;
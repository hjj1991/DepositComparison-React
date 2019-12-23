import React from 'react';
import BoardWriteContainer from 'containers/BoardWriteContainer';

const BoardWrite = ({match}) => {

    return (
        <BoardWriteContainer
            detailIndx={match.params.name} />
        // <BoardDetailContainer
        //     page={page}
        //     // pageSize={pageSize}
        // />
    );
};

export default BoardWrite;
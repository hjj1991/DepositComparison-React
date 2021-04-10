import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'shared/App';
import Bottom from 'components/Bottom';

const Root = () => (
    <BrowserRouter>
        <App/>
        <Bottom/>
    </BrowserRouter>
);

export default Root;
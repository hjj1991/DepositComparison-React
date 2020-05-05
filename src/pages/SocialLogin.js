import React from 'react';
import SocialLoginContainer from 'containers/SocialLoginContainer';
import queryString from 'query-string';

const SocialLogin = ({location, match}) => {
    const query = queryString.parse(location.search);
    const data = {
        provider: "",
        code: ""
    }
    data.provider = query.provider;
    data.code = query.code;
    console.log(match);
    console.log(query.code);
    return (
        <SocialLoginContainer
            data={data}
        />
    );
};

export default SocialLogin;
import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const KeepAlive2 = () => {
    const history = useHistory();
    const { state } = useLocation();
    return (
        <div
            onClick={() => {
                history.push({ pathname: (state && state.from) || '/keep-alive', state });
            }}
        >
            详情{JSON.stringify(state)}
        </div>
    );
};

export default KeepAlive2;

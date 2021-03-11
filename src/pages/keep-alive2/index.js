import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const KeepAlive2 = () => {
    const history = useHistory();
    const { state } = useLocation();

    const backEvent = () => {
        history.push({ state });
    };

    const unComponent = () => {
        console.log('组件卸载');
        window.removeEventListener('popstate', backEvent);
    };

    useEffect(() => {
        window.addEventListener('popstate', () => {
            backEvent();
        });

        return unComponent;
    }, []);
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

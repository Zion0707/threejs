import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './index.css';

const KeepAlive = () => {
    const history = useHistory();
    const location = useLocation();
    const { state } = location;
    const [scrollTop] = useState((state && state.scrollTop) || 0);

    const skip = () => {
        history.push({
            pathname: '/keep-alive2',
            state: { from: '/keep-alive', scrollTop: window.scrollY },
        });
    };

    const unComponent = () => {
        location.state = undefined;
    };

    useEffect(() => {
        window.scrollTo(0, scrollTop);
        return unComponent;
    }, []);

    return (
        <div className="home">
            <button
                onClick={() => {
                    history.push({ pathname: '/test' });
                }}
            >
                按钮
            </button>
            {scrollTop}
            <button type="button" className="btn" onClick={skip}>
                跳转
            </button>
        </div>
    );
};

export default KeepAlive;

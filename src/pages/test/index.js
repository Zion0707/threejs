import React, { useEffect } from 'react';
function Test() {
    const init = () => {
        // dom元素生成
        const contentEl = document.getElementById('content');
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;
        contentEl.style.cssText = `width:${winWidth}px;height:${winHeight}px`;
    };
    useEffect(() => {
        init();
    });
    return <div id="content"></div>;
}
export default Test;

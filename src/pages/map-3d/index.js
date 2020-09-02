import React, { useEffect } from 'react';
import './index.css';

function Map3d() {
    // 加载高德地图
    const loadamap = () => {
        return new Promise((reslove, reject) => {
            const script = document.createElement('script');
            script.src =
                'https://webapi.amap.com/maps?v=1.4.15&key=02b30d3994182a2256b8b4dbbb63c17a&callback=onBMapCallback';
            document.body.append(script);
            window.onBMapCallback = () => {
                const { AMap } = window;
                reslove(AMap);
            };
        });
    };

    useEffect(() => {
        loadamap().then((AMap) => {
            new AMap.Map('container', {
                center: [117.000923, 36.675807],
                zoom: 11,
            });
        });
    }, []);
    return (
        <>
            <div id="container"></div>
        </>
    );
}
export default Map3d;

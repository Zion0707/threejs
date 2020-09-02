import React, { useEffect } from 'react';
import './index.css';

function Map3d() {
    // 加载高德地图
    const loadamap = () => {
        return new Promise((reslove, reject) => {
            const script = document.createElement('script');
            script.src =
                'https://webapi.amap.com/maps?v=1.4.15&key=02b30d3994182a2256b8b4dbbb63c17a&plugin=Map3D&callback=onAMapCallback';
            document.body.append(script);
            window.onAMapCallback = () => {
                const { AMap } = window;
                reslove(AMap);
            };
        });
    };

    useEffect(() => {
        loadamap().then((AMap) => {
            new AMap.Map('container', {
                pitch: 75,
                viewMode: '3D',
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

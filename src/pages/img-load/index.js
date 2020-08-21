import React, { useEffect, useState } from 'react';
const imgsArr = [
    'http://dummyimage.com/200x100/FF6600',
    'http://dummyimage.com/200x100/4A7BF7&text=Hello',
];

function ImgLoad() {
    const [msg, setMsg] = useState('加载中...');
    const [imgList, setImgList] = useState([]);

    // 图片加载
    const imgLoad = async () => {
        const pArr = [];
        imgsArr.forEach((item) => {
            const p = new Promise((reslove) => {
                const img = new Image();
                img.src = item;
                img.onload = () => {
                    reslove(img);
                };
            });
            pArr.push(p);
        });

        const res = await Promise.all(pArr);
        return res;
    };

    useEffect(() => {
        const init = async () => {
            const res = await imgLoad();
            setImgList(res);
            setMsg('加载完成...');
        };
        init();
    }, []);

    return (
        <>
            {msg}
            {imgList.map((item) => {
                return <img key={item.src} src={item.src} />;
            })}
        </>
    );
}
export default ImgLoad;

import React, { useEffect, useState } from 'react';

const imgsList = [
    'http://dummyimage.com/1000x1000/FF6611',
    'http://dummyimage.com/1000x1000/FF6622',
    'http://dummyimage.com/1000x1000/FF6633',
    'http://dummyimage.com/1000x1000/FF6644',
    'http://dummyimage.com/1000x1000/FF6655',
    'http://dummyimage.com/2000x2000/FF6666',
    'http://dummyimage.com/1000x1000/FF6677',
    'http://dummyimage.com/1000x1000/FF6688',
    'http://dummyimage.com/1000x1000/FF6699',
    'http://dummyimage.com/1000x1000/FF66AA',
    'http://dummyimage.com/1000x1000/FF66BB',
    'http://dummyimage.com/1000x1000/FF66CC',
];

function ImgLoad() {
    const [loadNum, setLoadNum] = useState(0);

    // 图片加载
    const imgLoad = (imgsArr, callback) => {
        let num = 1;
        imgsArr.forEach(async (item) => {
            await new Promise((res) => {
                const img = new Image();
                img.src = item;
                img.onload = () => {
                    const percent = (num / imgsArr.length) * 100;
                    callback && callback(percent, img);
                    num++;
                    res(img);
                };
            });
        });
    };

    useEffect(() => {
        imgLoad(imgsList, (num, img) => {
            console.log(num, img);
            setLoadNum(num);
        });
    }, []);

    return (
        <>
            加载进度：{loadNum}%
            <br />
            {imgsList.map((item) => {
                return <img key={item} src={item} alt="图片" />;
            })}
        </>
    );
}
export default ImgLoad;

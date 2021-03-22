import React, { useEffect, useState } from 'react';
const imgsArr = [
    'http://dummyimage.com/100x100/FF6600&text=Hello',
    'http://dummyimage.com/100x100/4A7BF7&text=Hello',
    'http://dummyimage.com/100x100/4A7BFF&text=Hello',
    'http://dummyimage.com/100x100/4A7BBB&text=Hello',
    'http://dummyimage.com/100x100/EEEEEE&text=Hello',
];

function ImgLoad() {
    const [loadNum, setLoadNum] = useState(0);

    // 图片加载
    const imgLoad = (callback) => {
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
        imgLoad((num, img) => {
            console.log(num, img);
            setLoadNum(num);
        });
    }, []);

    return (
        <>
            {loadNum}%
            <br />
            {imgsArr.map((item) => {
                return <img key={item} src={item} alt="图片" />;
            })}
        </>
    );
}
export default ImgLoad;

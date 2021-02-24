/**
 * 获取随机范围数
 * @param {type:number, desc:最小值} min
 * @param {type:number, desc:最大值} max
 */
export function randomRange(min, max) {
    let minVal = min;
    let maxVal = max;
    const tmp = minVal;
    if (maxVal < minVal) {
        minVal = maxVal;
        maxVal = tmp;
    }
    return Math.floor(Math.random() * (maxVal - minVal + 1) + minVal);
}

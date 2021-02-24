export const randomNum = (Min, Max) => {
    const Range = Max - Min;
    const Rand = Math.random();
    const num = Min + Math.round(Rand * Range); // 四舍五入
    return num;
};

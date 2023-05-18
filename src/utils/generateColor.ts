//都道府県のコードから色を返す関数
export const getColor = (prefCode: number) => {

    const hue = Math.round(360 * prefCode / 47); 

    return `hsl(${hue}, 100%, 50%)`; //hsl(色相, 彩度, 輝度)
};

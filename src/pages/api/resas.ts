import apiClient from './apiClient';


// 都道府県一覧をapiから取得する関数
export async function getPrefectures() {
    const res = await apiClient.get('/prefectures');
    return res.data.result;
}

// ある県の総人口データをapiから取得する関数
export async function getPopulation(prefCode: number){
    const res = await apiClient.get(`/population/composition/perYear?cityCode=-&prefCode=${prefCode}`);
    return res.data.result.data[0].data;
}

// ある県の年少人口データをapiから取得する関数
export async function getChildPopulation(prefCode: number){
    const res = await apiClient.get(`/population/composition/perYear?cityCode=-&prefCode=${prefCode}`);
    return res.data.result.data[1].data;
}

// ある県の生産年齢人口データをapiから取得する関数
export async function getWorkingPopulation(prefCode: number){
    const res = await apiClient.get(`/population/composition/perYear?cityCode=-&prefCode=${prefCode}`);
    return res.data.result.data[2].data;
}

// ある県の老年人口データをapiから取得する関数
export async function getElderlyPopulation(prefCode: number){
    const res = await apiClient.get(`/population/composition/perYear?cityCode=-&prefCode=${prefCode}`);
    return res.data.result.data[3].data;
}



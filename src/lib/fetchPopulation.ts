import { Population, Prefecture } from "@/interfaces";
import { getChildPopulation, getElderlyPopulation, getPopulation, getWorkingPopulation } from "@/pages/api/resas";

//ある県の総人口データを取得
export const fetchPopulation = async (prefCode: number) => {
    try{
        const res = await getPopulation(prefCode)

        const data: Population[] = res.map((d: any) => ({
        year: d.year,
        [prefCode]: d.value,
        }));

        return data 

    }catch(error){
        console.error
    }
};

//ある県の年少人口データを取得する関数
export const fetchChildPopulation = async (prefCode: number) => {
    try{
        const res = await getChildPopulation(prefCode)

        const data: Population[] = res.map((d: any) => ({
        year: d.year,
        [prefCode]: d.value,
        }));

        return data

    }catch(error){
        console.error
        }
}

//ある県の生産年齢人口データを取得する関数
export const fetchWorkingPopulation = async (prefCode: number) => {
    try{
    const res = await getWorkingPopulation(prefCode)

    const data: Population[] = res.map((d: any) => ({
        year: d.year,
        [prefCode]: d.value,
    }));

    return data

    }catch(error){
    console.error
    }
}

//ある県の老年人口データを取得する関数
export const fetchElderlyPopulation = async (prefCode: number) => {
    try{
    const res = await getElderlyPopulation(prefCode)
    
    const data: Population[] = res.map((d: any) => ({
    year: d.year,
    [prefCode]: d.value,
    }));

    return data

    }catch(error){
    console.error
    }
}


export const fetchAllPopulationData = async (selectedPrefectures:number[],selectedDisplayData: number) => {

    //選択された都道府県の人口データをタブの内容に応じて取得し配列に格納
        let allPopulationData: any[] =  await Promise.all(selectedPrefectures.map( async(prefCode) => {
            if(selectedDisplayData === 0){ //総人口
            const data =  await fetchPopulation(prefCode);
            return data
            }else if(selectedDisplayData === 1){ //年少人口
            const data = await fetchChildPopulation(prefCode);
            return data
            }else if(selectedDisplayData === 2){ //生産年齢人口
            const data = await fetchWorkingPopulation(prefCode);
            return data
            }else if(selectedDisplayData === 3){ //老年人口
            const data = await fetchElderlyPopulation(prefCode);
            return data
            }

        })
        )

        //グラフに渡すための形式に変換
        allPopulationData = allPopulationData.flat();
        const dataByYear: {[year: number]: Population} = {};
        for (const data of allPopulationData) {
            if (!dataByYear[data.year]) {
            dataByYear[data.year] = { year: data.year };
            }
            for (const key in data) {
            if (key !== 'year') {
                dataByYear[data.year][key] = data[key];
            }
            }
        }


    return allPopulationData= Object.values(dataByYear);

    };
    
import React, { useEffect, useState } from 'react';
import axios from 'axios';

//都道府県の型
interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface Population {
  prefCode: number;
  year: number;
  value: number;
}

const IndexPage: React.FC = () => {

  const [prefectures, setPrefectures] = useState<Prefecture[]>([]); //都道府県の一覧
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]); //選択された都道府県コードの一覧
  const [population, setPopulation] = useState<Population[]>([]); //人口データ
  const [loading,setLoading] = useState<boolean>(true); //ローディング状態管理

  //都道府県の一覧を取得
  const fetchPrefectures = async () => {
    try{
      const res = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY },
      });
      setPrefectures(res.data.result);

    }catch(error){ 
      console.log(error);
    }
    setLoading(false);
  };

  //初回レンダリング時に都道府県の一覧を取得
  useEffect(() => {
    fetchPrefectures();
  }, []);

  //都道府県のチェックボックスの選択状態が変更されたとき
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prefCode = Number(event.target.value);
    if (event.target.checked) {
      setSelectedPrefectures((prevSelected) => [...prevSelected, prefCode]);
    } else {
      setSelectedPrefectures((prevSelected) => prevSelected.filter((code) => code !== prefCode));
    }
  };

  //人口データを取得
  const fetchPopulation = async (prefCode: number) => {
    try{
      const res = await axios.get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
        {
          headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY },
        }
      );

      //総人口のデータのみを抽出
      const data: Population[] = res.data.result.data[0].data.map((data: any) => ({
        prefCode: prefCode,
        year: data.year,
        value: data.value,
      }));

      return data //人口データを返す

    }catch(error){
      console.log(error);
    }
  };

  //選択された都道府県が変更されたとき
  useEffect(() => {

    //選択された都道府県がない場合は処理を中断
    if(selectedPrefectures.length === 0) return;
    
    //選択された都道府県の人口データを取得
    selectedPrefectures.forEach(async (prefCode) => {
      try{
        const data =  await fetchPopulation(prefCode);
        setPopulation((prev) => ({ ...prev, data}));
        console.log(data)
      }catch(error){
        console.log(error);
      }
      setLoading(false);
    });
  }, [selectedPrefectures]);

  if(loading){
    return <div>ローディング中</div>
  } 

  return (
    <>
    {prefectures.map((pref) => (
        <div key={pref.prefCode}>
          <label>
            <input
              type="checkbox"
              value={pref.prefCode}
              onChange={handleCheckboxChange}
            />
            {pref.prefName}
          </label>
        </div>
      ))}
    </>
  )

}

export default IndexPage;
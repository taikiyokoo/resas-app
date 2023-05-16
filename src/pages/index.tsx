import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

//47色
const colors = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", 
"#E6B333", "#3366E6", "#999966", "#99FF99", "#B34D4D",
"#80B300", "#809900", "#E6B3B3", "#6680B3", "#66991A", 
"#FF99E6", "#CCFF1A", "#FF1A66", "#E6331A", "#33FFCC",
"#66994D", "#B366CC", "#4D8000", "#B33300", "#CC80CC", 
"#66664D", "#991AFF", "#E666FF", "#4DB3FF", "#1AB399",
"#E666B3", "#33991A", "#CC9999", "#B3B31A", "#00E680", 
"#4D8066", "#809980", "#E6FF80", "#1AFF33", "#999933",
"#FF3380", "#CCCC00", "#66E64D", "#4D80CC", "#9900B3", 
"#E64D66", "#4DB380", "#FF4D4D", "#99E6E6", "#6666FF"];


//都道府県の型
interface Prefecture {
  prefCode: number;
  prefName: string;
}

//ある県の総人口データの型
interface Population {
  prefCode: number;
  data: {
    year: number;
    value: number;
  }[];
}

const IndexPage: React.FC = () => {

  const [prefectures, setPrefectures] = useState<Prefecture[]>([]); //都道府県の一覧
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]); //選択された都道府県コードの一覧
  const [population, setPopulation] = useState<Population[]>([]); //選択された県の総人口データの配列
  const [loading,setLoading] = useState<boolean>(true); //ローディング状態管理

  //都道府県の一覧を取得する関数
  const fetchPrefectures = async () => {
    try{
      const res = await axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY },
      });
      setPrefectures(res.data.result);

    }catch(error){ 
      console.error
    }
    setLoading(false);
  };

  //初回レンダリング時に都道府県の一覧を取得
  useEffect(() => {
    fetchPrefectures();
  }, []);

  //都道府県のチェックボックスの選択状態が変更されたときに実行される関数
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const prefCode = Number(event.target.value);
    if (event.target.checked) {
      setSelectedPrefectures((prevSelected) => [...prevSelected, prefCode]);
    } else {
      setSelectedPrefectures((prevSelected) => prevSelected.filter((code) => code !== prefCode));
    }
  };

  //ある県の総人口データを取得する関数
  const fetchPopulation = async (prefCode: number) => {
    try{
      const res = await axios.get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${prefCode}`,
        {
          headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY },
        }
      );

      //レスポンスから総人口のデータのみを抽出して代入
      const data: Population = {
        prefCode: prefCode,
        data: res.data.result.data[0].data.map((d: any) => ({
          year: d.year,
          value: d.value,
        }))
      }
    
      return data 

    }catch(error){
      console.error
    }
  };

  //選択された都道府県が変更されたときに実行
  useEffect(() => {

    //選択された都道府県がない場合は処理を中断
    if(selectedPrefectures.length === 0) return;
    
    //選択された都道府県の人口データを取得
    selectedPrefectures.forEach(async (prefCode) => {
      try{
        const data =  await fetchPopulation(prefCode);
        //受け取ったある県の総人口データを追加
        data &&setPopulation((prev) => [...prev, data]);
      }catch(error){
        console.error
      }
      setLoading(false);
    });
  }, [selectedPrefectures]);

  if(loading){
    return <div>ローディング中</div>
  } 

  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center',alignItems: 'center',height: '100vh' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px'}}>
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
    </div>
      <LineChart
        width={500}
        height={300}
        margin={{
          left: 100,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        {selectedPrefectures.map((prefCode) => (
          <Line
            key={prefCode}
            type="monotone"
            dataKey="value"
            data={population.find((pop) => pop.prefCode === prefCode)?.data}
            name={prefectures.find((pref) => pref.prefCode === prefCode)?.prefName}
            stroke={colors[prefCode]}
          />
        ))}
      </LineChart>
    </div>
    </>
  )

}

export default IndexPage;
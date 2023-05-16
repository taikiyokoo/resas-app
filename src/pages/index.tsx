import React, { useEffect, useState } from 'react';
import axios from 'axios';

//都道府県の型
interface Prefecture {
  prefCode: number;
  prefName: string;
}

const IndexPage: React.FC = () => {

  const [prefectures, setPrefectures] = useState<Prefecture[]>([]); //都道府県の一覧
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]); //選択された都道府県の一覧

  //都道府県の一覧を取得
  useEffect(() => {
    axios.get('https://opendata.resas-portal.go.jp/api/v1/prefectures', {
        headers: { 'X-API-KEY': process.env.NEXT_PUBLIC_RESAS_API_KEY },
      })
      .then((response) => {
        setPrefectures(response.data.result);
      });
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
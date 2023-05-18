import { Prefecture } from "@/interfaces";
import React from "react";
import styled from 'styled-components';

const CustomLabel = styled.label`
  font-size: 1.1em; 

  @media (max-width: 600px) {
    font-size: 0.8em; 
  }
`;

const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  transform: scale(1.5);
  margin-right: 10px;

  @media (max-width: 600px) {
    margin-right: 7px;
    transform: scale(1.2);
  }
`;

interface Props {
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<number[]>>;
  selectedPrefectures: number[];
  prefectures: Prefecture[];
}

const PrefectureCheck:React.FC<Props> = ({selectedPrefectures,prefectures,setSelectedPrefectures}) => {

    //都道府県のチェックボックスの選択状態が変更されたときに実行される関数
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
          <CustomLabel>
            <CustomCheckbox
              type="checkbox"
              value={pref.prefCode}
              onChange={handleCheckboxChange}
              checked={selectedPrefectures.includes(pref.prefCode)}
            />
            {pref.prefName}
          </CustomLabel>
        </div>
      ))}
    </>
  )
};

export default PrefectureCheck;
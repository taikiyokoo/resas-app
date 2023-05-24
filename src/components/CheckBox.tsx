import { Prefecture } from "@/interfaces";
import React from "react";
import styled from 'styled-components';

const CustomLabel = styled.label`
  font-size: 1em; 

  @media (max-width: 960px) {
    font-size: 0.8em; 
  }
  @media (max-width: 1280px) {
    font-size: 0.9em; 
  }
`;

const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  transform: scale(1.5);
  margin-right: 10px;

  @media (max-width: 960px) {
    margin-right: 7px;
    transform: scale(1.2);
  }
  @media (max-width: 1280px) {
    margin-right: 5px;
    transform: scale(1.3);
  }

`;

interface Props {
  setSelectedPrefectures: React.Dispatch<React.SetStateAction<number[]>>;
  selectedPrefectures: number[];
  pref: Prefecture;
}

const CheckBox:React.FC<Props> = ({selectedPrefectures,pref,setSelectedPrefectures}) => {

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
  
    </>
  )
};

export default CheckBox;
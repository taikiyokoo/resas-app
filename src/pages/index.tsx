import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {  getPrefectures} from './api/resas';
import { Population, Prefecture } from '@/interfaces';
import Graph from '@/components/Graph';
import { fetchAllPopulationData } from '@/lib/fetchPopulation';
import { GetStaticProps } from 'next';
import CheckBox from '@/components/CheckBox';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @media (max-width: 960px) {

  }
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const CheckboxContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  @media (max-width: 960px) {
    gap: 3px;
  }
`;


const Tab = styled.a`
  padding: 10px;
  cursor: pointer;
  opacity: 0.6;
  border-bottom: 2px solid transparent;
  &:hover {
    opacity: 1;
  }
  @media (max-width: 960px) {
    padding: 8px;
  }
`;

const ActiveTab = styled(Tab)`
  opacity: 1;
  border-bottom: 2px solid #A9A9A9;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
  @media (max-width: 960px) {
    margin-bottom: 20px;
  }
`;

interface HomeProps {
  prefectures: Prefecture[];
}

//都道府県の一覧を取得
export const getStaticProps: GetStaticProps = async () => {
  try {
    const prefectures:Prefecture = await getPrefectures();
    if (!prefectures) {
      console.error('getPrefectures returned undefined');
      return { props: { prefectures: [] } };
    }
    return { props: { prefectures } };
  } catch (error) {
    console.error(error);
    return { props: { prefectures: [] } };
  }
};

const IndexPage: React.FC<HomeProps> = ({prefectures}) => {

  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]); //選択された都道府県コードの一覧
  const [population, setPopulation] = useState<Population[]>([]); 
  const [loading,setLoading] = useState<boolean>(true); //ローディング状態管理
  const [selectedDisplayData,setSelectedDisplayData] = useState<number>(0); //表示するデータの配列 0:総人口、2:年少人口、3:生産年齢人口、4:老年人口

  //選択された都道府県が変更されたときに実行
  useEffect(() => {

    setLoading(true);
    //選択された都道府県がない場合は処理を中断
    if(selectedPrefectures.length === 0) {
      setLoading(false);
      return;
    }

  //選択された都道府県の人口データを取得してstateにセット
  const fetchPoulationData = async () => {
      const allPopulationData = await fetchAllPopulationData(selectedPrefectures, selectedDisplayData);
      setPopulation(allPopulationData)
      setLoading(false);
    };

    fetchPoulationData();

  }, [selectedPrefectures, selectedDisplayData]);

  return (
    <Container>
      <div>
        <Tabs>
          {selectedDisplayData != 0? <Tab onClick={() => setSelectedDisplayData(0)}>総人口</Tab> : <ActiveTab>総人口</ActiveTab>}
          {selectedDisplayData != 1? <Tab onClick={() => setSelectedDisplayData(1)}>年少人口</Tab> : <ActiveTab>年少人口</ActiveTab>}
          {selectedDisplayData != 2? <Tab onClick={() => setSelectedDisplayData(2)}>生産年齢人口</Tab> : <ActiveTab>生産年齢人口</ActiveTab>}
          {selectedDisplayData != 3? <Tab onClick={() => setSelectedDisplayData(3)}>老年人口</Tab> : <ActiveTab>老年人口</ActiveTab>}
        </Tabs>
        <MainContainer>
            <CheckboxContainer>
              {prefectures.map((pref) => (
                  <CheckBox key={pref.prefCode} pref={pref} selectedPrefectures ={selectedPrefectures} setSelectedPrefectures ={setSelectedPrefectures}/>
                ))}
            </CheckboxContainer>
            <Graph prefectures={prefectures} selectedPrefectures = {selectedPrefectures} selectedDisplayData={selectedDisplayData} population={population} loading={loading} />
        </MainContainer>
      </div>
    </Container>
  )
}

export default IndexPage;
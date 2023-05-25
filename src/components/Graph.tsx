import React from 'react'
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer } from 'recharts';
import { Population, Prefecture } from '@/interfaces';
import { getColor } from '@/utils/generateColor';


const ChartContainer = styled.div`
    width: 40vw;
    @media (max-width: 960px) {
        margin-top: 40px;
        margin-right: 60px;
        margin-top: 20px;
        width: 70vw;
        }
    @media (max-width: 480px) {
        margin-top: 40px;
        margin-right: 60px;
        margin-top: 20px;
        width: 100vw;
    }
}
`;
const GraphTitle = styled.h1`

    text-align: center;
    font-size: 1em;
    margin-left: 60px;
    margin-bottom: 30px;
    @media (max-width: 960px) {
        font-size: 0.8em;
        margin-left: 60px;
        margin-bottom: 15px;
        }
    
`;

interface Props {
    selectedDisplayData: number;
    selectedPrefectures: number[];
    prefectures: Prefecture[];
    population: Population[];
    loading: boolean;
}
const title:string[] = ["総人口（人）","年少人口（人）","生産年齢人口（人）","老年人口（人）"]

const Graph:React.FC<Props> = ({selectedDisplayData,selectedPrefectures,prefectures,population,loading}) => {

return (
    <div>
        {selectedPrefectures.length > 0 &&
            <ChartContainer data-testid="graph">
                <GraphTitle>{loading? "データ取得中..." : title[selectedDisplayData]}</GraphTitle>
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart
                        margin={{
                        left: 60,
                        }}
                        data={population}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="year" domain={['1960', '2045']}>
                        <Label value="（年）" position="insideBottomRight" dy={20}/>
                        </XAxis>
                        <YAxis />
                        <Tooltip/>
                        <Legend />
                        {selectedPrefectures.map((prefCode) => (
                        <Line
                            dataKey={prefCode.toString()}
                            key={prefCode}
                            type="monotone"
                            name={prefectures.find((pref) => pref.prefCode === prefCode)?.prefName}
                            stroke={getColor(prefCode)}
                        />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </ChartContainer> }
        </div>
)
}

export default Graph

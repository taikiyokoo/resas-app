import React from 'react'
import styled from 'styled-components';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { Population, Prefecture } from '@/interfaces';
import { getColor } from '@/utils/generateColor';


const ChartContainer = styled.div`

    @media (max-width: 600px) {
        margin-top: 40px;
        margin-right: 60px;
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
                <h1 style={{textAlign: 'center',fontSize: '1em',marginLeft: '60px',marginBottom: '30px'}}>{loading? "データ取得中..." : title[selectedDisplayData]}</h1>
                <LineChart
                    width={400}
                    height={300}
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
            </ChartContainer> }
        </div>
)
}

export default Graph

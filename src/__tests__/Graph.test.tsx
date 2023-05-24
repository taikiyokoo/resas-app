import React from 'react';
import Graph from '@/components/Graph';
import { render, screen } from '@testing-library/react';
import { Population } from '@/interfaces';

// テスト用のデータ
const mockSelectedPrefectures = [1, 2];
const mockPrefectures = [
  { prefCode: 1, prefName: '北海道' },
  { prefCode: 2, prefName: '青森' },
];
const mockPopulation:Population[] = [{
    year: 2010,
    value: 100,
    prefCode: 1,
}]; 

describe("Graph", () => {

  it('表示データのタイトルが正常に表示されているか', () => {
    render(
      <Graph
        selectedDisplayData={0} 
        selectedPrefectures={mockSelectedPrefectures}
        prefectures={mockPrefectures}
        population={mockPopulation}
        loading={false} 
      />
    );
    expect(screen.getByText('総人口（人）')).toBeInTheDocument();
    expect(screen.queryByText('データ取得中...')).not.toBeInTheDocument(); 
  });


  it('ローディング中のタイトルが正常に表示されているか', () => {
    render(
      <Graph 
        selectedDisplayData={1} 
        selectedPrefectures={mockSelectedPrefectures}
        prefectures={mockPrefectures}
        population={mockPopulation}
        loading={true} 
      />
    );
    expect(screen.queryByText('総人口（人）')).not.toBeInTheDocument(); ;
    expect(screen.getByText('データ取得中...')).toBeInTheDocument();
  });

  it('selectedPrefecturesが0のとき、グラフは非表示になるか', () => {
    render(
      <Graph 
        selectedDisplayData={1} 
        selectedPrefectures={[]}
        prefectures={mockPrefectures}
        population={mockPopulation}
        loading={false} 
      />
    );
    expect(screen.queryByTestId("graph")).not.toBeInTheDocument();
  });
});

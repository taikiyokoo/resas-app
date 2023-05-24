import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IndexPage from '@/pages';
import { Prefecture } from '@/interfaces';

//モックデータ
const mockPrefectures:Prefecture[] = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森' },
  ];


describe('IndexPage', () => {

  it('正しくレンダリングされているか', async () => {
    // ホーム画面をレンダリング
    render(<IndexPage prefectures={mockPrefectures} />);

    // 最初はGraphコンポーネントがレンダリングされていないことを確認
    expect(screen.queryByTestId("graph")).not.toBeInTheDocument();

    // タブが適切にレンダリングされているかを確認
    expect(screen.getByText('総人口')).toBeInTheDocument();
    expect(screen.getByText('年少人口')).toBeInTheDocument();
    expect(screen.getByText('生産年齢人口')).toBeInTheDocument();
    expect(screen.getByText('老年人口')).toBeInTheDocument();

    // チェックボックスが適切にレンダリングされているかを確認
    expect(screen.getByText('北海道')).toBeInTheDocument();
    expect(screen.getByText('青森')).toBeInTheDocument();
  });

  it('チェックボックスをクリックしたときにグラフが表示されるか', async () => {
    // ホーム画面をレンダリング
    render(<IndexPage prefectures={mockPrefectures} />);
  
    // チェックボックスをクリック
    const checkbox = screen.getByLabelText('北海道'); // '北海道' というラベルを持つチェックボックスを取得
    fireEvent.click(checkbox);
  
    // Graphコンポーネントがレンダリングされるのを待つ
    await waitFor(() => {
      expect(screen.getByTestId("graph")).toBeInTheDocument();
    });
  });
  
});

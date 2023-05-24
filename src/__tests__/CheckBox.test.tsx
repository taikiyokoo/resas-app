import { render, fireEvent, screen } from '@testing-library/react';
import CheckBox from '@/components/CheckBox';
import React from 'react';


// テスト用のデータ
const pref = {
  prefCode: 1,
  prefName: '北海道'
};

// setSelectedPrefecturesのモック関数
const mockSetSelectedPrefectures = jest.fn();

describe("CheckBox", () => {
  beforeEach(() => {
    render(
      <CheckBox 
        selectedPrefectures={[]} 
        pref={pref}
        setSelectedPrefectures={mockSetSelectedPrefectures} 
      />
    );
  });

  it('チェックボックスが適切にレンダリングされているかを確認', () => {
    expect(screen.getByText('北海道')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });


  it('チェックボックスをクリックしたときにsetSelectedPrefecturesが呼ばれるか', () => {
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockSetSelectedPrefectures).toHaveBeenCalled();
  });
});

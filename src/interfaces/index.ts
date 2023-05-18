//都道府県の型
export interface Prefecture {
    prefCode: number;
    prefName: string;
}

//ある県の人口データの型
export interface Population {
    year: number;
    [prefCode: string]: number;
}

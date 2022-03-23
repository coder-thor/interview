export interface ISeachMsv {
    date: string;
    sv: number;
}

export interface IProductsTrends {
    name: string;
    search_msv: Array<ISeachMsv>
}
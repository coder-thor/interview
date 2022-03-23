import { Action } from "redux";

// types
import { IProductsTrends } from "../types";

// 和redux相关的公共类型

export interface IAction extends Action {
    payload: any;
}

export interface IProductsReduxType {
    productsTrends: IProductsTrends[];
    isLoadingProductsTrends: boolean;
}

// store的类型
export type TStore = {
    products: IProductsReduxType;
}
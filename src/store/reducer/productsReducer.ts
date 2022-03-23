// dependencies
import { Reducer } from "redux"
import _ from "lodash";

// types
import { IProductsTrends } from "../../types";
import { IAction } from "../types";

// action types
import { UPDATE_PRODUCTS_TRENDS, UPDATE_PRODUCTS_TRENDS_LOADING } from "../actionTypes";

// 和搜索相关的reducer
const productsReducer: Reducer<{
    productsTrends: Array<IProductsTrends>,
    isLoadingProductsTrends: boolean
}, IAction> = (baseData = {
    productsTrends: [],
    isLoadingProductsTrends: false, // 当前是否正在加载产品趋势数据
}, action) => {
    const { type, payload } = action;
    switch(type) {
        case UPDATE_PRODUCTS_TRENDS: 
            return {
                ..._.cloneDeep(baseData),
                productsTrends: payload
            };
        case UPDATE_PRODUCTS_TRENDS_LOADING:
            return {
                ..._.cloneDeep(baseData),
                isLoadingProductsTrends: payload
            }
        default:
            return baseData
    }
}

export default productsReducer;
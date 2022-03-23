import { Dispatch } from "redux";

// types
import { IAction } from "../types";

// apis
import { fetchProductsTrends } from "../../request";

// actionTypes
import { UPDATE_PRODUCTS_TRENDS, UPDATE_PRODUCTS_TRENDS_LOADING } from "../actionTypes";

// 和产品相关的action creator

/**
 * 
 * @param keywords 关键字
 * @returns 
 */
export const $updateProductsTrendsByKeywords = (keywords: string = "") => async (dispatch: Dispatch<IAction>) => {

    // 如果关键字变化, 那么这里做一个异步操作 去请求服务端数据, 然后再更新redux, 进而控制视图更新
    dispatch({
        type: UPDATE_PRODUCTS_TRENDS_LOADING,
        payload: true
    })
    const { product_trends: productsTrends } = await fetchProductsTrends(keywords);
    dispatch({
        type: UPDATE_PRODUCTS_TRENDS,
        payload: productsTrends
    })
    dispatch({
        type: UPDATE_PRODUCTS_TRENDS_LOADING,
        payload: false
    })
}
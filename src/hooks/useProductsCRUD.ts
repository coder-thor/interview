// dependencies
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"

// types
import { IProductsReduxType, TStore } from "../store/types";

// action creator
import { $updateProductsTrendsByKeywords } from "../store/actionCreators";
/**
 * 基于react + ddd模式下的和业务强相关的自定义hook
 * 用于控制整个工程里所有场景下对于产品的crud操作
 * 如果不将这种业务逻辑抽离出来, 假设有很多地方要处理和产品趋势相关的逻辑
 * 那可能需要导入很多次action creator, useDispatch等依赖, 增加维护成本
 * 如果需要提高复用度, 颗粒度可以降低(避免一个自定义hook导出太多东西)
 */
export default function useProductsCRUD() {
    const dispatch = useDispatch();
    const addProducts = useCallback(() => {}, []); // 新增产品
    const deleteProducts = useCallback(() => {}, []); // 删除产品
    // ..

    const { 
        isLoadingProductsTrends,
        productsTrends
     } = useSelector<TStore, IProductsReduxType>(state => state.products)

    // 获取产品趋势
    const getProductTrends = useCallback((keywords: string) => {
        dispatch($updateProductsTrendsByKeywords(keywords));
    }, [dispatch])

    return {
        getProductTrends,
        addProducts,
        deleteProducts,
        isLoadingProductsTrends,
        productsTrends
    }
}
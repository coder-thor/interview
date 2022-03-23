import axiosInstance from "../axios"

// types
import { IProductsTrends } from "../../types"

// 和产品有关的api


// 产品趋势响应结果的类型约束

// 获取产品趋势
export const fetchProductsTrends= async (keywords: string) => {
    return axiosInstance.post<any, {
        product_trends: Array<IProductsTrends>
    }, {
        search_phrase: string
    }>("/interview/keyword_search", {
        search_phrase: keywords
    })
}

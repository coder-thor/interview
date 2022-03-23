// dependencies
import { useEffect, useLayoutEffect } from "react";

// components
import ProductTrendChartItem from "./ProductTrendChartItem";

// hooks
import useConvenientRouter from "../../hooks/useConvenientRouter";
import useProductsCRUD from "../../hooks/useProductsCRUD";

// styles
import SearchResultStyle from "./style";

export default function SearchResult(): JSX.Element {
    const {
        params
    } = useConvenientRouter<{ keywords: string }>();
    
    const {
        getProductTrends,
        isLoadingProductsTrends,
        productsTrends
    } = useProductsCRUD();
    
    useEffect(() => {
        // 只要这关键词一变化, 我就直接去拿数据了
        getProductTrends(params.keywords);
    }, [params.keywords])

    useLayoutEffect(() => {

    }, [productsTrends])

    return (
        <SearchResultStyle>
            <div className="title">Related products trends</div>
            <div className="content">
                { 
                    isLoadingProductsTrends ? "正在请求数据..." : 
                    (
                        productsTrends.map(pt => (
                            <ProductTrendChartItem key={pt.name} keywords={ params.keywords } search_msv={pt.search_msv} name={pt.name} />
                        ))
                    ) 
                }
            </div>
        </SearchResultStyle>
    )
}
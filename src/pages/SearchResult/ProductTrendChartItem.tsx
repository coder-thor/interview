
// dependencies
import { PropsWithChildren, useLayoutEffect, useRef, RefObject, useMemo, useState } from "react";
import { IProductsTrends } from "../../types";
import * as echarts from "echarts";

// 这个echarts的ts类型真的难找... 或者是我找的方式有问题
// 已经很久很久没有用过echarts了
import { ComposeOption } from "echarts/core";
import {
    TitleComponentOption,
    TooltipComponentOption,
    ToolboxComponentOption,
    GridComponentOption
} from "echarts/components";
import { XAXisOption, YAXisOption, SeriesOption } from 'echarts/types/dist/shared';

// components
import TrendSkeleton from "./TrendSkeleton";


// style
import { ProductTrendChartItemStyle } from "./style";

type EChartsCoreOption = ComposeOption<
    | TitleComponentOption
    | TooltipComponentOption
    | ToolboxComponentOption
    | GridComponentOption
    | XAXisOption
    | YAXisOption
    | SeriesOption
>;

/**
 * 渲染单个的echart图表
 */
export default function ProductTrendChartItem(props: PropsWithChildren<IProductsTrends & { keywords: string }>) {
    const [isReady, setIsReady] = useState<boolean>(false) // 当前canvas是否已经绘制完毕了

    // 构建图表数据
    const chartData = useMemo<{ date: Array<string>; data: Array<number> }>(() => {
        const data: Array<number> = [];
        const date: Array<string> = [];
        props.search_msv.forEach(({ date: dateValue, sv }) => {
            data.push(sv);
            date.push(dateValue);
        })
        return {
            data,
            date
        }
    }, [])

    // 构建图表配置
    const chartOption = useMemo<EChartsCoreOption>(() => {
        const { data, date } = chartData;
        const curColor: string = Math.random() > 0.5 ? "#a1c8b7" : "#9ebcda";
        return {
            xAxis: { // x轴配置
                type: "category",
                boundaryGap: false,
                data: date,
                show: false,
            },
            yAxis: { // y轴配置
                type: "value",
                show: false, // 不显示y轴数据
            },
            series: [
                {
                    name: props.name,
                    type: "line", // 折线图,
                    areaStyle: { // 面积样式, 因为服务端返回的数据里并不携带色值数据, 所以我采用一个随机色值
                        color: curColor,
                    },
                    data: data,
                    itemStyle: {
                        color: curColor
                    },
                    symbol: "none", // 不要把每个点展示出来
                }
            ],
            grid: { // 需要让canvas铺满容器, 所以四个位置全部0
                left: 0,
                top: 0,
                bottom: 0,
                right: 0
            }
        }
    }, [props.name, chartData])


    // 因为如果你搜索了关键字的话, 你的关键字是需要高亮的, 所以我们需要分析一下传递进来的名字
    const analysisProductNameResult = useMemo<{ type: string; text: string }[]>(() => {
        const result = []
        if (props.name.includes(props.keywords)) {
            const startIndex = props.name.indexOf(props.keywords);
            const endIndex = props.keywords.length + startIndex;
            for (let i = 0, len = props.name.length; i < len; i++) {
                // 只需要将中间高亮的一部分打上特殊的加粗标记
                if (i < startIndex || i > endIndex) {
                    result.push({
                        type: "normal", 
                        text: props.name[i]
                    })
                } else {
                    result.push({
                        type: "bold",
                        text: props.name[i]
                    })
                }
            }
        } else {
            result.push({
                type: "normal",
                text: props.name
            })
        }
        return result
    }, [props.name, props.keywords])

    const chartTargetRef = useRef(null);

    // 当search_msv变动的时候就需要去重新初始化echarts了
    useLayoutEffect(() => {
        // 实际上useLayoutEffect一定会在react 渲染完毕以后调用, 所以这个时候真实dom一定有值了
        // 是不需要做null的判断的
        const myChart = echarts.init(chartTargetRef.current as unknown as HTMLElement);
        // 绘制图表 
        myChart.on("finished", () => {
            setIsReady(true);
        })
        myChart.setOption(chartOption);
        return myChart.dispose; // 注销图表
    }, [chartOption])

    return (
        <>
            {
                <ProductTrendChartItemStyle className={isReady ? "show-chart" : "hide-chart"}>
                    <div className="item-title">
                        {
                            analysisProductNameResult.map((textConf, index) => {
                                return (
                                    <span key={`${textConf.text}_${index}`} style={{ fontWeight: textConf.type === "bold" ? "bold" : "normal" }}>{textConf.text}</span>
                                )
                            })
                        }
                    </div>
                    <div className="item-content" ref={chartTargetRef} ></div>
                    <div className="item-date">{`${chartData.date[0]} - ${chartData.date[chartData.date.length - 1]}`}</div>
                    <div className={ isReady ? "skeleton-wrapper hide-ske" : "skeleton-wrapper show-ske" }><TrendSkeleton /></div>
                </ProductTrendChartItemStyle>

            }
        </>
    )
}
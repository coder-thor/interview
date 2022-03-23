import styled from "styled-components";

export default styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px 240px;
    box-sizing: border-box;
    .title {
        margin-bottom: 15px;
    }
    .content {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        gap: 15px;
    }
    .skeleton-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
        transition: all 0.3s;
        &.hide-ske {
            opacity: 0;
        }
        &.show-ske {
            opacity: 1;
        }
    }
`

export const ProductTrendChartItemStyle = styled.div`
    width: 130px;
    height: 145px;
    border: 1px solid #ddd;
    position: relative;
    background: #fff;
    cursor: pointer;
    &.show-chart {
        border: 1px solid #ddd;
        background: #fff;
        .item-title, .item-content, .item-date {
            opacity: 1;
        }
    }
    &.hide-chart {
        border: 1px solid transparent;
        background: transparent;
        .item-title, .item-content, .item-date {
            opacity: 0;
        }
    }
    .item-title {
        color: #333;
        font-size: 14px;
        height: 45px;
        box-sizing: border-box;
        padding-left: 10px;
        padding-top: 15px;
    }
    .item-content {
        box-sizing: border-box;
        width: 130px;
        height: 80px;
    }
    .item-date {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        color: #666;
        height: 22px;
    }
`

export const TrendSkeletonStyle = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .inner-wrapper {
        width: 100%;
        height: 100% !important;
        gap: 15px;
    }
    .title-ske {
        width: 80%;
        height: 10px;
        background: #dfddd5;
        border-radius: 3px;
    }
    .des-ske {
        width: 40%;
        height: 10px;
        border-radius: 3px;
        background: #dfddd5;
    }
    .chart-ske {
        flex-grow: 1;
        background: #dfddd5;
    }
`
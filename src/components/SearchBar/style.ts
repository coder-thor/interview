import styled from "styled-components";

// color
import { mainColor } from "../../constants/color";

export default styled.div`
    width: 100%;
    height: 5vh;
    min-height: 46px;
    border-bottom: 1px solid #ddd;
    overflow: hidden;
    display: flex;
    padding: 0 16% 0 5%;
    box-sizing: border-box;
    align-items: center;
    .title {
        cursor: pointer;
        margin-right: 20px;
        span:first-of-type {
            font-weight: bold;
        }
    }
    .search-input {
        height: 25px;
        .MuiOutlinedInput-root  {
            height: 100%;
            input {
                height: 100%;
                font-size: 12px;
            }
        }
        .MuiOutlinedInput-notchedOutline  {
            border: 1px solid ${mainColor} !important;
        }
    }
    .search-btn {
        height: 25px;
        width: 40px !important;
        min-width: auto !important;
        display: flex;
        justify-content: center;
        margin-left: 8px;
        border: 1px solid ${mainColor};
        :hover {
            background: rgba(0, 0, 0, 0.03) !important;
            border: 1px solid ${mainColor} !important;
            outline: none;
        }
        .MuiButton-startIcon {
            margin-right: 0px !important;
            margin-left: 0px !important;
            color: ${mainColor};
        }
    }
`
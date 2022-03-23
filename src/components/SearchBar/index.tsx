// dependencies
import { PropsWithChildren, useCallback, useState } from "react";
import TextField from '@mui/material/TextField';
import SearchOutlined from "@material-ui/icons/SearchOutlined"
import Button from '@mui/material/Button';
import _ from "lodash";

// hooks
import useConvenientRouter from "../../hooks/useConvenientRouter";
import useWatchKeyBoardEvent from "../../hooks/useWatchKeyBoardEvent";

// style
import SearchBarStyle from "./style";

// 全局通用的搜索框
export default function SearchBar({
    boldTitle = "Best",
    regularTitle = "Search"
}: PropsWithChildren<{
    boldTitle?: string; // 加粗的字
    regularTitle?: string; // 普通的字
}>) {

    // 用户搜索的关键字
    const [searchWords, setSearchWords] = useState<string>("");

    const {
        history
    } = useConvenientRouter();

    // 直接去到搜索结果路由
    const goToResultRoute = useCallback(() => {
        // 我要先看看他有没有打空格, 打空格的话需要特殊处理一下
        const searchWordsArr = searchWords.trim().split(" ");
        let resultKey = "";
        const len = searchWordsArr.length;
        searchWordsArr.forEach((w, index) => {
            resultKey += w;
            if (index < len - 1) {
                // 代表还没到最后一个, 我需要拼接加号
                resultKey += "+";
            }
        })
        history.push(`/search/${resultKey}`);
    }, [searchWords, history])

    useWatchKeyBoardEvent(["Enter"], goToResultRoute);

    // 当用户输入时要修改状态
    const updateSearchWords = useCallback((e) => {
        if (_.isEqual(e.target.value, searchWords)) return;
        setSearchWords(e.target.value);
    }, [searchWords])

    // 回到首页
    const goBackToHome = useCallback(() => {
        history.push("/"); // 回到首页就好了
    }, [history])
    return (
        <SearchBarStyle>
            <div onClick={ goBackToHome } className="title">
                <span>{ boldTitle }</span>
                <span>{ regularTitle }</span>
            </div>
            <TextField
                value={ searchWords }
                onChange={ updateSearchWords }
                className="search-input" 
                size="small" 
                fullWidth 
                label="" 
                id="fullWidth" />
            <Button onClick={ goToResultRoute } className="search-btn" variant="outlined" startIcon={ <SearchOutlined /> } />
        </SearchBarStyle>
    )
}
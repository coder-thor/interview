// dependencies
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// root reducer
import rootReducer from "./reducer/index";

/**
 * thunk实际上在处理异步action的时候就是写起来简单, 不需要太多的心智负担, 但是实际上thunk的缺陷也比较明显
 * 
 * 因为thunk污染了 action, 使得原本是一个plain object的action可以允许是函数
 * 这样会导致在React Devtools里无法追踪用户真正触发的是什么action, 当项目庞大
 * action比较多的时候, 就会越来越吃力, 如果考虑维护成本而非心智负担的话 应该去使用saga
 */
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


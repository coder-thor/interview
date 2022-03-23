
/**
 * react-router-dom version: v5.2
 * description: 符合react理念的组件式路由
 */

// dependencies
import { lazy } from "react"
import {
    Switch,
    Route,
    Redirect
} from "react-router-dom"

// components
import SuspenseResolveComp from "./SuspenseResolveComp"

const Home = lazy(() => import("../pages/Home/index"))
const SearchResult = lazy(() => import("../pages/SearchResult/index"))

export default function Routes(): JSX.Element {
    return (
        <SuspenseResolveComp>
            <Switch>
                <Route exact path="/search/:keywords" component={SearchResult} />
                <Route exact path="/" component={Home} />
                {/* 最后一个放置404 或者重定向都是没什么问题的, 看具体需求 */}
                <Redirect from="*" to="/" />
            </Switch>
        </SuspenseResolveComp>
    )
}
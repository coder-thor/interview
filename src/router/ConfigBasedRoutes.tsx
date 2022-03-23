// dependencies
import { renderRoutes, RouteConfig } from "react-router-config";
import { lazy } from "react";

// components
import SuspenseResolveComp from "./SuspenseResolveComp"
import { Switch, Redirect } from "react-router-dom";

const Home = lazy(() => import("../pages/Home/index"))
const SearchResult = lazy(() => import("../pages/SearchResult/index"))

// 基于第三方库的符合Vue风格的配置式路由
const routesConfig: Array<RouteConfig> = [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        path: "/search/:keywords",
        component: SearchResult,
        exact: true
    },
    {
        path: "*",
        render: () => <Redirect from="*"  to ="/"/>
    }
]

export default function ConfigBasedRoutes() {
    return (
        <SuspenseResolveComp>
            <Switch>
                { renderRoutes(routesConfig) }
            </Switch>
        </SuspenseResolveComp>
    )
}
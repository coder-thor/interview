import { useParams, useHistory, useLocation } from "react-router-dom";

/**
 * 这个自定义hook其实主要就是用来在工程中更加方便的取路由的相关信息
 */
export default function useConvenientRouter<
    ParamsType extends {} = {},
    HistoryType = unknown,
    LocationType = unknown,
>() {
    const params = useParams<ParamsType>();
    const history = useHistory<HistoryType>();
    const location = useLocation<LocationType>();
    return {
        location,
        pathname: location.pathname,
        params,
        history
    }
}
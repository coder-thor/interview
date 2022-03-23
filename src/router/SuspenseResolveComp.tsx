
/**
 * 用于懒加载的suspense组件
 * 
 */

// dependencies
import { Suspense, PropsWithChildren } from "react"

// components
import ComponentLoading from "./ComponentLoading"

export default function SuspenseResolveComp(props: PropsWithChildren<{}>): JSX.Element {
    return (
        <Suspense fallback={<ComponentLoading />}>
            { props.children }
        </Suspense>
    )
}
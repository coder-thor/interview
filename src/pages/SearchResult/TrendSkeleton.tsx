
// dependencies
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

// style
import { TrendSkeletonStyle } from "./style";


// 和产品趋势有关的骨架屏
export default function TrendSkeleton() {
    return (
        <TrendSkeletonStyle>
            <Stack className="inner-wrapper" spacing={-1}>
                <Skeleton variant="rectangular" className="title-ske" />
                <Skeleton variant="rectangular" className="des-ske" />
                <Skeleton variant="rectangular" className="chart-ske" />
            </Stack>
        </TrendSkeletonStyle>
    )
}
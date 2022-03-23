
// dependencies
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// 当组件懒加载过程中, 展示的loading组件
export default function ComponentLoading(): JSX.Element {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
    )
}
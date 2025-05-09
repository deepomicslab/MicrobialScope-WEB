import { Stack } from "@mui/system"
import { Spin } from "antd"

export const LoadingView = ({ width, height, containerSx, children }) => (
    <Stack
        sx={{
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            ...containerSx
        }}
    >
        {
            children ?
                children
                :
                <Spin tip="Loading" size="large"/>
        }
    </Stack>
)

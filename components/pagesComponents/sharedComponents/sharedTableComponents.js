import { Stack } from "@mui/system"
import { Span } from "@/components/styledComponents/styledHTMLTags"
import { Tooltip } from "antd"
import InfoIcon from "@/components/icons/Info"

export const TitleWithTooltip = ({ title, info }) => (
    <Stack direction='row' alignItems='center'>
        <Span>{title}</Span>
        {/*<Tooltip title={info}>*/}
        {/*    <InfoIcon style={{ fontSize: '18px', color: 'rgb(166, 176, 195)', marginLeft: '3px' }}/>*/}
        {/*</Tooltip>*/}
    </Stack>
)

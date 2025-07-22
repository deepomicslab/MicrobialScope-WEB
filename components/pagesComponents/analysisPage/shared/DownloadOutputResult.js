import { Box, Stack } from "@mui/system"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import { Button, Descriptions } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import { downloadSingleFile, getAnalysisOutputFileURL } from "@/dataFetch/get"

export const TaskOutputDownloadButton = ({ uploadPath, filePath }) => (
    <Box sx={{ textAlign: 'center' }}>
        <Button
            type='link'
            icon={<DownloadOutlined/>}
            onClick={() => downloadSingleFile(`${getAnalysisOutputFileURL}${uploadPath}/output${filePath}`)}
        >
            Click to Download File
        </Button>
    </Box>
)

const DownloadOutputResult = ({ items }) => {
    return (
        <Stack>
            <H6 sx={{
                fontSize: '36px',
                mt: '12px',
                mb: '36px',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '12px',
            }}>
                Download Output Result
            </H6>
            <Descriptions
                bordered
                column={2}
                items={items}
            />
        </Stack>
    )
}

export default DownloadOutputResult

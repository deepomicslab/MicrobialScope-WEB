import { Stack } from "@mui/system"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import { Descriptions } from "antd"
import {
    buildDownloadDescriptionsColumns
} from "@/components/pagesComponents/downloadPage/buildDownloadDescriptionsColumns"

export const DownloadDescriptions = ({ microbe, magStatus }) => {
    const columns = buildDownloadDescriptionsColumns(microbe, magStatus)

    return (
        <Stack spacing={4}>
            <H6
                sx={{
                    fontSize: '36px',
                    mt: '12px',
                    mb: '36px',
                    borderBottom: '2px solid #e0e0e0',
                    paddingBottom: '12px',
                }}
            >
                {`${magStatus} ${microbe} Meta Download`}
            </H6>
            <Descriptions bordered items={columns} column={2} />
        </Stack>
    )
}

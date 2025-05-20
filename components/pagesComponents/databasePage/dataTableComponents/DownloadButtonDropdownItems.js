import { Box, Stack } from "@mui/system"
import { postDownloadBatchFile } from "@/dataFetch/post"
import { Span } from "@/components/styledComponents/styledHTMLTags"
import { LinkOutlined } from "@ant-design/icons"

export const buildDownloadDropdownItems = (selectedRowInfo, filterOptions, total, openMessage, url, allowFileTypes) => {
    const buildDownloadChildren = (downloadType) => {
        return allowFileTypes.map(
            ({ key, label }) => ({
                key: `${downloadType === 'selected' ? 1 : 2}-${key}`,
                label: (
                    <Box
                        onClick={
                            () => {
                                openMessage()
                                postDownloadBatchFile(
                                    url,
                                    {
                                        downloadType: downloadType,
                                        fileType: key,
                                        payload: downloadType === 'selected' ? selectedRowInfo.rowKeys : filterOptions
                                    }
                                )
                            }
                        }
                    >
                        {label}
                    </Box>
                ),
                disabled: key !== 'meta'
            })
        )
    }

    return [
        {
            key: '1',
            label: (
                <Box>
                    Download Selected ({selectedRowInfo.rowKeys.length})
                </Box>
            ),
            children: buildDownloadChildren('selected'),
            disabled: selectedRowInfo.rowKeys.length === 0
        },
        {
            key: '2',
            label: (
                <Box>
                    Download Filtered
                    ({Object.values(filterOptions).some(arr => Array.isArray(arr) && arr.length > 0) ? total : 0})
                </Box>
            ),
            children: buildDownloadChildren('filtered'),
            disabled: !Object.values(filterOptions).some(arr => Array.isArray(arr) && arr.length > 0)
        },
        {
            key: '3',
            label: (
                <Stack direction='row' spacing={0.5}>
                    <Span>Download All</Span>
                    <LinkOutlined/>
                </Stack>
            ),
            disabled: true
        }
    ]
}

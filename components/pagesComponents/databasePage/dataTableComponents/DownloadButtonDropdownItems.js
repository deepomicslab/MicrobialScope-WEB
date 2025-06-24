import { Box } from "@mui/system"
import { postDownloadBatchFile } from "@/dataFetch/post"

export const buildDownloadDropdownItems = (
    selectedRowInfo,
    filterOptions,
    total,
    openMessage,
    url,
    allowFileTypes,
    microbe,
    magStatus,
    dataType
) => {
    const buildDownloadChildren = (downloadType) => {
        return allowFileTypes.map(
            ({ key, label }) => ({
                key: `${downloadType === 'selected' ? 1 : 2}-${key}`,
                label: (
                    <Box
                        onClick={
                            () => {
                                if (selectedRowInfo.rowKeys.length > 100) {
                                    openMessage(false)
                                } else {
                                    openMessage(true)
                                    postDownloadBatchFile(
                                        url,
                                        {
                                            downloadType: downloadType,
                                            fileType: key,
                                            payload: downloadType === 'selected' ? selectedRowInfo.rowKeys : filterOptions,
                                            microbe: microbe,
                                            magStatus: magStatus,
                                        }
                                    )
                                }
                            }
                        }
                    >
                        {label}
                    </Box>
                )
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
        }
    ]
}

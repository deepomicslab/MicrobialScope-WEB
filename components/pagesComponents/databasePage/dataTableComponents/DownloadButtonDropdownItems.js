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
                                            payload: downloadType === 'selected' ? buildPayload(dataType, selectedRowInfo, microbe) : filterOptions,
                                            microbe: microbeMap[microbe],
                                            magStatus: magStatus,
                                            dataType: dataType
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

const buildPayload = (dataType, selectedRowInfo, microbe) => {
    if (dataType === 'proteins' || dataType === 'antibioticResistanceGenes' || dataType === 'transmembraneHelices') {
        return selectedRowInfo.rows.map(row => `${row[microbeKeyMao[microbe]]}:${row['contig_id']}:${row['protein_id']}`)
    } else {
        return selectedRowInfo.rowKeys
    }
}

const microbeMap = {
    archaea: 'Archaea',
    bacteria: 'Bacteria',
    fungi: 'Fungi',
    viruses: 'Viruses',
}

const microbeKeyMao = {
    archaea: 'archaea_id',
    bacteria: 'bacteria_id',
    fungi: 'fungi_id',
    viruses: 'viruses_id',
}

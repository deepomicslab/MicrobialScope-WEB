import { Box, Stack } from "@mui/system"
import { Button, Progress } from "antd"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import { DownloadOutlined } from "@ant-design/icons"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"

const SubmittedMicrobialSequences = ({ sequences, columns }) => {
    const handleExportTSV = () => {
        if (!sequences || sequences.length === 0) return

        const allKeys = Object.keys(sequences[0])
        const orderedKeys = ['id', ...allKeys.filter(k => k !== 'id')]

        const headerMap = {
            Acession_ID: 'Microbial_ID',
        }

        const headerLine = orderedKeys
            .map(key => headerMap[key] || key)
            .join('\t')
        const dataLines = sequences.map(row =>
            orderedKeys.map(key => String(row[key] ?? '')).join('\t')
        )

        const tsvContent = [headerLine, ...dataLines].join('\n')

        const blob = new Blob([tsvContent], { type: 'text/tab-separated-values;charset=utf-8' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = 'submitted_sequences.tsv'
        link.click()

        URL.revokeObjectURL(url)
    }

    return (
        <Stack>
            <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                    borderBottom: '2px solid #e0e0e0',
                    paddingBottom: '12px',
                    marginTop: '12px',
                    marginBottom: '36px'
                }}
            >
                <H6 sx={{ fontSize: '36px', margin: 0, pb: '8px' }}>
                    Submitted Microbial Sequences
                </H6>

                <Button
                    type='primary'
                    icon={<DownloadOutlined/>}
                    onClick={handleExportTSV}
                >
                    Export as TSV
                </Button>
            </Stack>
            <StyledTable
                columns={columns}
                rowKey={(record) => record['id']}
                dataSource={sequences}
                scroll={{ y: 55 * 12 }}
            />
        </Stack>
    )
}

export default SubmittedMicrobialSequences

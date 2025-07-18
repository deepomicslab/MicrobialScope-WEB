import { Box, Stack } from "@mui/system"
import { Alert, Button, Card, Select, Upload, Typography, message } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useState } from "react"
import { DropdownDownloadDemoButton } from "@/components/pagesComponents/analysisPage/shared/DropdownButtons"
import { useGlobalMessage } from "@/components/context/MessageContext"

const { Title } = Typography

const microbialOptions = [
    { label: 'Archaea', value: 'Archaea' },
    { label: 'Bacteria', value: 'Bacteria' },
    { label: 'Fungi', value: 'Fungi' },
    { label: 'Viruses', value: 'Viruses' }
]

const MAX_FILE_SIZE_MB = 20
const ALLOWED_EXTENSIONS = ['.fasta', '.fa', '.fna']

const isValidFile = (file, messageApi) => {
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
    const isAllowed = ALLOWED_EXTENSIONS.includes(ext)
    const isSizeValid = file.size / 1024 / 1024 < MAX_FILE_SIZE_MB

    if (!isAllowed) {
        messageApi.error(`File type not allowed. Must be: ${ALLOWED_EXTENSIONS.join(', ')}`)
    }
    if (!isSizeValid) {
        messageApi.error('File size must be under 20MB.')
    }

    return isAllowed && isSizeValid
}

const AnalysisSubmitCard = ({
    uploadTip = null,
    onSubmit
}) => {
    const [microbialType, setMicrobialType] = useState(null)
    const [fileList, setFileList] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const messageApi = useGlobalMessage()

    const handleBeforeUpload = (file) => {
        return isValidFile(file, messageApi) ? false : Upload.LIST_IGNORE
    }

    const handleFileChange = ({ fileList: newList }) => {
        const trimmedList = newList.slice(-1)
        setFileList(trimmedList)
    }

    const handleSubmit = () => {
        if (!microbialType || fileList.length === 0) {
            setSubmitted(true)
        }
        onSubmit(microbialType, fileList)
    }

    return (
        <Card
            style={{
                marginTop: 24,
                borderRadius: 8,
                border: '1px solid #eee',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
        >
            <Stack spacing={2}>
                <Box>
                    <Title level={3} style={{ marginBottom: 16, marginTop: 12 }}>
                        1. Select Microbial Type
                    </Title>
                    <Select
                        placeholder="Choose a microbial type"
                        options={microbialOptions}
                        value={microbialType}
                        onChange={setMicrobialType}
                        style={{ width: 300 }}
                    />
                </Box>

                <Box>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >
                        <Title level={3} style={{ marginBottom: 16, marginTop: 12 }}>
                            2. Upload Sequence File
                        </Title>
                        <DropdownDownloadDemoButton/>
                    </Stack>
                    <Stack spacing={2}>
                        {uploadTip}
                        <Upload.Dragger
                            accept=".fasta,.fa, .fna"
                            beforeUpload={handleBeforeUpload}
                            multiple={false}
                            fileList={fileList}
                            onChange={handleFileChange}
                            style={{
                                backgroundColor: '#fafafa',
                                padding: 20,
                                border: '1px dashed #1890ff',
                                borderRadius: 8,
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <UploadOutlined style={{ fontSize: 32, color: '#1890ff' }}/>
                            </p>
                            <p className="ant-upload-text">Click or drag file to upload</p>
                            <p className="ant-upload-hint">
                                Only .fasta / .fa / .fna formats. File should be under 20MB.
                            </p>
                        </Upload.Dragger>
                    </Stack>
                </Box>

                {submitted && (!microbialType || fileList.length === 0) && (
                    <Alert
                        type="warning"
                        showIcon
                        message="Please select microbial type and upload a sequence file."
                    />
                )}

                <Box textAlign="center">
                    <Button type="primary" size='large' style={{ width: 125 }} onClick={handleSubmit}>
                        Submit
                    </Button>
                </Box>
            </Stack>
        </Card>
    )
}

export default AnalysisSubmitCard

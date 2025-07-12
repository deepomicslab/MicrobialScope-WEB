import { Box, Stack } from "@mui/system"
import { Alert, Button, Card, Select, Upload, Typography, message } from "antd"
import { FileOutlined, UploadOutlined } from "@ant-design/icons"
import { useState } from "react"
import { A } from "@/components/styledComponents/styledHTMLTags"

const { Title } = Typography

const microbialOptions = [
    { label: 'Archaea', value: 'archaea' },
    { label: 'Bacteria', value: 'bacteria' },
    { label: 'Fungi', value: 'fungi' },
    { label: 'Viruses', value: 'viruses' }
]

const MAX_FILE_SIZE_MB = 10
const ALLOWED_EXTENSIONS = ['.fasta', '.fa', '.fna']

const isValidFile = (file, messageApi) => {
    console.log(file)
    const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
    const isAllowed = ALLOWED_EXTENSIONS.includes(ext)
    const isSizeValid = file.size / 1024 / 1024 < MAX_FILE_SIZE_MB

    if (!isAllowed) {
        messageApi.error(`File type not allowed. Must be: ${ALLOWED_EXTENSIONS.join(', ')}`)
    }
    if (!isSizeValid) {
        messageApi.error('File size must be under 10MB.')
    }

    return isAllowed && isSizeValid
}

const AnalysisSubmitCard = ({
    uploadTip = null,
    demoFilePath = '/demoData/GCA_000006805.1.fna'
}) => {
    const [microbialType, setMicrobialType] = useState(null)
    const [fileList, setFileList] = useState([])
    const [submitted, setSubmitted] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()

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
            return
        }
        console.log('Submit:', {
            microbialType,
            file: fileList[0],
        })
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
                        <Button
                            type='primary'
                            icon={<FileOutlined/>}
                            href={demoFilePath}
                        >
                            See Example FASTA
                        </Button>
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
                                Only .fasta / .fa / .fna formats. File should be under 10MB.
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
            {contextHolder}
        </Card>
    )
}

export default AnalysisSubmitCard

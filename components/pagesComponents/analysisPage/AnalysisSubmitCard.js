import { Box, Stack } from "@mui/system"
import { Alert, Button, Card, Select, Upload, Typography } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import { useState } from "react"

const { Title } = Typography

const microbialOptions = [
    { label: 'Archaea', value: 'archaea' },
    { label: 'Bacteria', value: 'bacteria' },
    { label: 'Virus', value: 'virus' }
]

const AnalysisSubmitCard = ({

}) => {
    const [microbialType, setMicrobialType] = useState(null)
    const [fileList, setFileList] = useState([])
    const [submitted, setSubmitted] = useState(false)

    const handleFileChange = ({ fileList: newList }) => {
        setFileList(newList)
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
                    <Title level={3} style={{ marginBottom: 16, marginTop: 12 }}>
                        2. Upload Sequence File
                    </Title>
                    <Box>
                        <Upload.Dragger
                            accept=".fasta,.fa"
                            beforeUpload={() => false}
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
                    </Box>
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

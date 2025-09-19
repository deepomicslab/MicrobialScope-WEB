import { Typography } from "antd"

const { Title, Paragraph, Text } = Typography

const MetaEndpoints = () => (
    <>
        <Paragraph>
            <Text strong>Endpoint: </Text><Text mark>GET /api/download/meta</Text>
        </Paragraph>
        <Paragraph>
            <Text strong>Description: </Text>Downloads filtered microbe metadata as a CSV file. Supports filtering by
            organism name, species, total sequence length range, and GC content range.
        </Paragraph>
        <Paragraph>
            <Text strong>Parameters:</Text>
        </Paragraph>
    </>
)

const Endpoints = () => (
    <Typography>
        <Title level={2} style={{ marginTop: '19px', marginBottom: '15px' }}>Endpoints</Title>
        <Title level={3} style={{ marginTop: '14px', marginBottom: '12px' }}>1. Download Metadata</Title>
        <MetaEndpoints/>
    </Typography>
)

export default Endpoints

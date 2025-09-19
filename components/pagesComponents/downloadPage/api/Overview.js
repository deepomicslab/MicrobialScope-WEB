import { Typography } from "antd"

const { Title, Paragraph, Text } = Typography

const Overview = ({}) => (
    <Typography>
        <Title level={2} style={{ marginTop: '19px', marginBottom: '15px' }}>Overview</Title>
        <Paragraph>
            The Download API provides endpoints to retrieve genomic and annotation data for microbial genomes from
            the MicrobialScope database. It supports downloading metadata in CSV format, as well as FASTA, GenBank,
            GFF3, and various annotation files for specific genomes. The API is implemented in Django and supports
            four microbe types <Text mark>(Archaea, Bacteria, Fungi, Viruses)</Text> and two genome types <Text mark>(
            Mag and Monoisolate)</Text>.
        </Paragraph>
        <Paragraph>
            <Text strong>Base URL: </Text><Text mark>https://microbialapi.deepomics.org/api/download/</Text>
        </Paragraph>
    </Typography>
)

export default Overview

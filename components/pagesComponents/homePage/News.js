import React from 'react';
import { Timeline, Typography, Card } from 'antd';
import { Box } from "@mui/system"
import { CalendarOutlined } from "@ant-design/icons"

const { Title, Text } = Typography;

const timelineItems = [
    {
        color: 'blue',
        dot: <CalendarOutlined style={{ fontSize: '20px' }}/>,
        children: (
            <>
                <Title level={4} style={{ marginBottom: 8 }}>Version 1.3 (2025.9.20)</Title>
                <Box>
                    <strong>Quality Enhancements and Expanded Features</strong>. This update focuses on improving data
                    reliability and
                    user accessibility. Key highlights include:
                    <ul style={{ paddingLeft: '30px', margin: 0 }}>
                        <li>
                            Integration of <strong>GTDB taxonomy</strong> for bacterial and archaeal genomes, enhancing
                            phylogenetic resolution.
                        </li>
                        <li>
                            Introduced <strong>a flexible Download API</strong> for customized data retrieval, including
                            Metadata, FASTA, and more.
                        </li>
                        <li>
                            Performed dataset update with newly released genomes and refined QC filters.
                        </li>
                        <li>
                            Fixed various bugs.
                        </li>
                    </ul>
                </Box>
            </>
        )
    },
    {
        color: 'blue',
        dot: <CalendarOutlined style={{ fontSize: '20px' }}/>,
        children: (
            <>
                <Title level={4} style={{ marginBottom: 8 }}>Version 1.2 (2025.7.23)</Title>
                <Box>
                    <strong>New Analysis Modules.</strong> We&apos;ve expanded our analytical capabilities with new
                    modules allowing users to upload and analyze their own data. New features include:
                    <ul style={{ paddingLeft: '30px', margin: 0 }}>
                        <li>
                            ORF Prediction & Protein Classification
                        </li>
                        <li>
                            tRNA & tmRNA Prediction
                        </li>
                        <li>
                            Virulence Factor & Antibiotic Resistance Gene Detecion
                        </li>
                        <li>
                            Transmembrane Protein Annotation
                        </li>
                        <li>
                            Sequence Alignment
                        </li>
                        <li>
                            Comparative Analysis
                        </li>
                    </ul>
                    All modules generate interactive visualizations and downloadable results.
                </Box>
            </>
        )
    },
    {
        color: 'blue',
        dot: <CalendarOutlined style={{ fontSize: '20px' }}/>,
        children: (
            <>
                <Title level={4} style={{ marginBottom: 8 }}>Version 1.1 (2025.6.30)</Title>
                <Box>
                    <strong>Interactive Visualization Features.</strong> Our new interactive genomic annotation
                    visualization enables intuitive exploration of genomic features. You can now:
                    <ul style={{ paddingLeft: '30px', margin: 0 }}>
                        <li>
                            Zoom in/out using mouse wheel
                        </li>
                        <li>
                            Navigate through regions by horizontal dragging
                        </li>
                        <li>
                            Download visualization charts in SVG and PNG formats
                        </li>
                        <li>
                            View protein product names directly on the map when viewing regions smaller than 25,000
                            bp
                        </li>
                    </ul>
                </Box>
            </>
        ),
    },
    {
        color: 'blue',
        dot: <CalendarOutlined style={{ fontSize: '20px' }}/>,
        children: (
            <>
                <Title level={4} style={{ marginBottom: 8 }}>Version 1.0 (2025.5.1)</Title>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    <li>
                        MicrobialScope has been released. Welcome to use!
                    </li>
                </ul>
            </>
        ),
    },
]

const News = () => {
    return (
        <Card
            title={<Title level={3}>MicrobialScope Release News</Title>}
            style={{
                borderRadius: '8px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'auto'
            }}
        >
            <Box
                sx={{
                    maxWidth: 500,
                    minWidth: 500,
                    maxHeight: 460,
                }}
            >
                <Timeline mode="left" items={timelineItems}/>
            </Box>
        </Card>
    );
};

export default News;

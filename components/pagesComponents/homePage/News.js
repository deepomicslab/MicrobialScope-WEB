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
                <Title level={4} style={{ marginBottom: 8 }}>Version 1.2 (2025.7.23)</Title>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    <li>
                        <strong>New Analysis Modules.</strong> We&apos;ve expanded our analytical capabilities with new
                        modules allowing users to upload and analyze their own data. New features include:
                        <ul>
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
                    </li>
                </ul>
            </>
        )
    },
    {
        color: 'blue',
        dot: <CalendarOutlined style={{ fontSize: '20px' }}/>,
        children: (
            <>
                <Title level={4} style={{ marginBottom: 8 }}>Version 1.1 (2025.6.30)</Title>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    <li>
                        <strong>Interactive Visualization Features.</strong> Our new interactive genomic annotation
                        visualization enables intuitive exploration of genomic features. You can now:
                        <ul>
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
                    </li>
                </ul>
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

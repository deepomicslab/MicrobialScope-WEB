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
                <Title level={4} style={{ marginBottom: 8 }}>Version 1.1 (2025.7.24)</Title>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    <li>Add <strong>&quot;ORF prediction & Protein classification&quot;</strong>, <strong>&quot;tRNA &
                        tmRNA prediction&quot;</strong>, <strong>&quot;Virulent Factor & Antibiotic Resistance Gene
                        Detection&quot;</strong>, <strong>&quot;Transmembrane Protein
                        Annotation&quot;</strong>, <strong>&quot;Sequence
                        Alignment&quot;</strong>, <strong>&quot;Comparative Analysis&quot;</strong> Analysis Modules.
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
                <Title level={4} style={{ marginBottom: 8 }}>Version 1.0 (2025.6.30)</Title>
                <ul style={{ paddingLeft: '20px', margin: 0 }}>
                    <li>
                        <strong>MicrobialScope</strong> has been released. Welcome to use!
                    </li>
                </ul>
            </>
        ),
    },
]

const News = () => {
    return (
        <Card
            title={<Title level={3}>NEWS</Title>}
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

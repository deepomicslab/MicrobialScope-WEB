import { Box, Stack } from "@mui/system"
import { Button, Typography } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"

const { Title, Paragraph } = Typography

const Introduction = () => (
    <Box sx={{ py: 10, textAlign: 'center' }}>
        <Title
            level={2}
            style={{
                fontWeight: 'bold',
                fontSize: '3.5rem',
                marginBottom: '1rem',
            }}
        >
            Explore Comprehensive Microbial Molecular Profiles with{' '}
            <span
                style={{
                    background: 'linear-gradient(to right, #a855f7, #ec4899, #f43f5e)',
                    // background: 'linear-gradient(to right, #34d399, #3b82f6, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 'bold',
                }}
            >
          MicrobialScope
        </span>
        </Title>

        <Paragraph
            type="secondary"
            style={{
                fontSize: '1.25rem',
                marginTop: '36px',
                marginBottom: '24px',
            }}
        >
            MicrobialScope empowers researchers with an integrative resource for multi-layered microbial data — from core genomic content to defense systems and metabolic pathways — across major microbial domains.
        </Paragraph>

        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            mt={4}
        >
            <Button
                type="default"
                href="#dataset-statistics"
                style={{
                    borderColor: '#0ea5e9',
                    color: '#0ea5e9',
                }}
                size='large'
            >
                Data Statistics
            </Button>

            <a href="/view">
                <Button
                    type="primary"
                    icon={<ArrowRightOutlined />}
                    style={{
                        backgroundColor: '#3b82f6',
                        borderColor: '#3b82f6',
                    }}
                    size='large'
                    iconPosition='end'
                >
                    Explore Data
                </Button>
            </a>
        </Stack>
    </Box>
)

export default Introduction

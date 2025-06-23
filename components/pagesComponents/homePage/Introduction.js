import { Box, Stack } from "@mui/system"
import { Typography } from "antd"
import HomeSearchBar from "@/components/inputComponents/HomeSearchBar"
import { useState } from "react"
import { useRouter } from "next/router"

const { Title, Paragraph } = Typography

const microbeOptions = [
    {
        value: 'archaea',
        label: 'Archaea'
    },
    {
        value: 'bacteria',
        label: 'Bacteria'
    },
    {
        value: 'fungi',
        label: 'Fungi'
    },
    {
        value: 'viruses',
        label: 'Viruses'
    }
]

const magOptions = [
    {
        value: 'MAG',
        label: 'MAG'
    },
    {
        value: 'unMAG',
        label: 'Monoisolate'
    }
]

const Introduction = () => {
    const router = useRouter()
    const [homeSearchValue, setHomeSearchValue] = useState({
        microbeField: 'archaea',
        magField: 'MAG',
        keyword: ''
    })

    const handleSearchChange = (newValue) => {
        setHomeSearchValue(newValue)
    }

    const handleSearch = ({ microbeField, magField, keyword }) => {
        router.push(`/database/genomes?microbe=${microbeField}&mag=${magField}&keyword=${keyword}`)
    }

    return (
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
                MicrobialScope empowers researchers with an integrative resource for multi-layered microbial data — from
                core genomic content to defense systems and metabolic pathways — across major microbial domains.
            </Paragraph>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                alignItems='center'
                mt={4}
            >
                <Box width="60%">
                    <HomeSearchBar
                        value={homeSearchValue}
                        onChange={handleSearchChange}
                        onSearch={handleSearch}
                        microbeOptions={microbeOptions}
                        magOptions={magOptions}
                        size='large'
                        placeholder='Enter Microbial ID'
                        searchTip='eg. GCA_000025685.1, GCF_000006805.1, GCF_000025685.1, GCF_004799605.1'
                    />
                </Box>

            </Stack>
        </Box>
    )
}

export default Introduction

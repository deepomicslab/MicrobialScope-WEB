import { Box, Stack } from "@mui/system"
import { Carousel, Typography, Image } from "antd"
import { Img } from "@/components/styledComponents/styledHTMLTags"

const { Title } = Typography

const Focus = ({}) => {

    return (
        <Box sx={{ mt: 2 }}>
            <Title level={2} style={{ textAlign: 'center', marginBottom: '48px' }}>
                Focus
            </Title>
            <Stack alignItems="center" spacing={2}>
                <Image
                    src='/Figure1.svg'
                    width='80%'
                />
                <Image
                    src='/Figure2.svg'
                    width='80%'
                />
            </Stack>
        </Box>
    )
}

export default Focus

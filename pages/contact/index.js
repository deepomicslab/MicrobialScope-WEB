import { Box, Grid, Stack } from "@mui/system"
import { A, H6, Img, Span } from "@/components/styledComponents/styledHTMLTags"
import { Avatar, Card } from "antd"
import {
    BankOutlined,
    BookOutlined,
    EnvironmentOutlined,
    ExperimentOutlined,
    MailOutlined,
    UserOutlined
} from "@ant-design/icons"
import Image from "next/image"

const ContactContent = ({}) => {
    return (
        <Stack sx={{ px: '32px' }}>
            <ContactBody/>
        </Stack>
    )
}

const ContactBody = () => {
    return (
        <Grid container spacing={2} sx={{ marginTop: '64px', marginBottom: '48px' }}>
            <Grid size={5} offset={0.5}>
                <TeamIntroduction/>
            </Grid>
            <Grid size={6} offset={0.5}>
                <Authors/>
            </Grid>
        </Grid>
    )
}

const TeamIntroduction = () => {
    return (
        <Stack spacing={3} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Img
                    src="/MicrobialScope_logo.png"
                    sx={{
                        height: '84px',
                        width: '84px'
                    }}
                />
                <H6 sx={{ fontSize: '48px' }}>Our Team</H6>
            </Stack>
            <Stack
                sx={{
                    border: '1px solid #0000001F',
                    borderRadius: '10px',
                    padding: '40px 40px'
                }}
            >
                <Stack spacing={1} sx={{ alignItems: 'center', paddingTop: '36px' }}>
                    <Box sx={{ fontSize: '24px', textAlign: 'justify', lineHeight: '48px' }}>
                        We are a diverse team of talented research assistants, Ph.D. candidates, and assistant
                        investigators, led by Prof. LI Shuai Cheng at the City University of Hong Kong and Prof. CHEN Yu
                        at the Shenzhen Institute of Advanced Technology. Our team comprises individuals with extensive
                        molecular biology, bioinformatics, and computer science expertise. If you have any inquiries or
                        require further information, please feel free to reach out to us at <A
                        sx={{ cursor: 'text' }}>shuaicli@cityu.edu.hk</A> or
                        <A sx={{ cursor: 'text' }}> yu.chen@siat.ac.cn</A>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    )
}

const AuthorsCard = ({ name, src, alt }) => {
    const colors = [
        '#f56a00', '#7265e6', '#ffbf00', '#00a2ae',
        "#FF5733", "#33FF57", "#5733FF", "#FF33A1",
        "#33A1FF", "#F9A825", "#8E24AA", "#00BCD4",
        "#009688", "#3F51B5"
    ]

    return (
        <Card
            style={{
                width: 320,
                border: '1px solid #0000001F',
                fontSize: '18px',
            }}
        >
            <Stack alignItems="center" spacing={1}>
                <Avatar
                    size={150}
                    icon={
                        <Img
                            src={src}
                            alt={alt}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '50%'
                            }}
                        />
                    }
                />
                <Stack spacing={1}>
                    <Stack direction="row" spacing={1}>
                        <UserOutlined/>
                        <Span sx={{ fontWeight: '600' }}>{name}</Span>
                    </Stack>
                </Stack>
            </Stack>
            {/*<Stack sx={{ alignItems: 'center', paddingBottom: '12px' }}>*/}
            {/*    <Avatar style={{ backgroundColor: colors[colorIndex], verticalAlign: 'middle' }} size={56}>*/}
            {/*        {char}*/}
            {/*    </Avatar>*/}
            {/*</Stack>*/}
        </Card>
    )
}

const Authors = () => {
    return (
        <Stack spacing={3} sx={{ alignItems: 'center' }}>
            <H6 sx={{ fontSize: '48px', paddingBottom: '20px' }}>Authors</H6>
            <Stack spacing={5.5}>
                <Grid container spacing={4} sx={{ fontSize: '20px' }}>
                    <Grid size={6}>
                        <AuthorsCard name="Shuai Cheng Li" src={'/lsc.jpg'} alt="Shuai Cheng Li"/>
                    </Grid>
                    <Grid size={6}>
                        <AuthorsCard name="Yu Chen" src={'/cy.png'} alt='Yu Chen'/>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ fontSize: '20px' }}>
                    <Grid size={6}>
                        <AuthorsCard name="Xikang Feng" src={'/fxk.png'} alt='Xikang Feng'/>
                    </Grid>
                    <Grid size={6}>
                        <AuthorsCard name="Yinhu Li" src={'/lyh.png'} alt='Yinhu Li'/>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ fontSize: '20px' }}>
                    <Grid size={6}>
                        <AuthorsCard name="Jieyi Zheng" src={'/zjy.png'} alt='Jieyi Zheng'/>
                    </Grid>
                    <Grid size={6}>
                        <AuthorsCard name="Xuhua Chen" src={'/cxh.png'} alt='Xuhua Chen'/>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ fontSize: '20px' }}>
                    <Grid size={6}>
                        <AuthorsCard name="Shuo Yang" src={'/ys.png'} alt='Shuo Yang'/>
                    </Grid>
                </Grid>
            </Stack>
        </Stack>
    )
}

export default ContactContent

import { CustomFooter } from "@/components/styledComponents/styledLayoutComponents"
import { Box, Grid, Stack } from "@mui/system"
import { H6, Hr, Img, Span } from "@/components/styledComponents/styledHTMLTags"
import { EnvironmentOutlined, MailOutlined, UserOutlined } from "@ant-design/icons"

const MicrobeScopeFooter = () => (
    <CustomFooter>
        <Hr sx={{ marginBottom: '24px' }}/>
        <Grid container>
            <Grid size={6} offset={0.5}>
                <Stack spacing={2}>
                    <H6 sx={{ fontSize: '24px', paddingBottom: '6px' }}>
                        Contact us
                    </H6>
                    <Stack direction="row" spacing={1} sx={{ fontSize: '16px', alignItems: 'center' }}>
                        <EnvironmentOutlined/>
                        <Span>Address: City University of Hong Kong, Tat Chee Avenue, Kowloon, Hong
                            Kong, China</Span>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ fontSize: '16px', alignItems: 'center' }}>
                        <MailOutlined/>
                        <Span>Email: shuaicli@cityu.edu.hk</Span>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{ fontSize: '16px', alignItems: 'center' }}>
                        <UserOutlined/>
                        <Span>Profile: <a href="https://scholars.cityu.edu.hk/en/persons/shuaicli" target="_blank">LI Shuai Cheng</a></Span>
                    </Stack>
                </Stack>
            </Grid>
            <Grid size={4} offset={1.5}>
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ fontSize: '16px', height: '100%' }}
                    spacing={2}
                >
                    <Img
                        src="/cs_logo_eng_cmyk.svg"
                        alt="CityU Logo"
                        width={407}
                        height={71}
                        style={{ marginLeft: '16px' }}
                    />
                    <Span>©2025 City University of HongKong. All rights reserved.</Span>
                </Stack>
            </Grid>
        </Grid>
    </CustomFooter>
)

export default MicrobeScopeFooter

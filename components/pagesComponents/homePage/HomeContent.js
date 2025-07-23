import { Box, Grid, Stack } from "@mui/system"
import Introduction from "@/components/pagesComponents/homePage/Introduction"
import { Hr } from "@/components/styledComponents/styledHTMLTags"
import Microorganisms from "@/components/pagesComponents/homePage/Microorganisms"
import FunctionalStatistic from "@/components/pagesComponents/homePage/FunctionalStatistic"
import Focus from "@/components/pagesComponents/homePage/Focus"
import KeywordCloud from "@/components/pagesComponents/homePage/KeywordCloud"
import News from "@/components/pagesComponents/homePage/News"

const HomeContent = ({ statistic }) => (
    <Stack>
        <Introduction/>
        <Hr/>
        <Microorganisms statistic={statistic}/>
        <FunctionalStatistic statistic={statistic}/>
        <Focus/>
        <Grid container sx={{ marginTop: '24px' }}>
            <Grid size={6}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                >
                    <KeywordCloud/>
                </Box>
            </Grid>
            <Grid size={6}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                >
                    <News/>
                </Box>
            </Grid>
        </Grid>
    </Stack>
)

export default HomeContent

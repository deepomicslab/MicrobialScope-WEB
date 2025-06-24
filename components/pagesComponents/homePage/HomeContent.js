import { Stack } from "@mui/system"
import Introduction from "@/components/pagesComponents/homePage/Introduction"
import { Hr } from "@/components/styledComponents/styledHTMLTags"
import Microorganisms from "@/components/pagesComponents/homePage/Microorganisms"
import FunctionalStatistic from "@/components/pagesComponents/homePage/FunctionalStatistic"
import Focus from "@/components/pagesComponents/homePage/Focus"

const HomeContent = ({ statistic }) => (
    <Stack>
        <Introduction/>
        <Hr/>
        <Microorganisms statistic={statistic}/>
        <FunctionalStatistic statistic={statistic}/>
        <Focus/>
    </Stack>
)

export default HomeContent

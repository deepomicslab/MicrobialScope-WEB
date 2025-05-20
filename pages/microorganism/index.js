import { Stack } from "@mui/system"
import MicrobeBarChartComponent from "@/components/pagesComponents/microbesPage/MicrobeBarChartComponent"
import useSWR from "swr"
import { fetcher, getMicrobeStatisticsURL } from "@/dataFetch/get"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { ErrorView } from "@/components/stateViews/ErrorView"
import MicrobeTable from "@/components/pagesComponents/microbesPage/MicrobeTable"

const Microbes = () => {
    const {
        data,
        isLoading,
        error
    } = useSWR(getMicrobeStatisticsURL, fetcher)

    if (isLoading) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    if (error) {
        return <ErrorView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return (
        <Stack>
            <MicrobeBarChartComponent data={data}/>
            <MicrobeTable data={data}/>
        </Stack>
    )
}

export default Microbes

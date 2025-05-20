import { useRouter } from "next/router"
import { LoadingView } from "@/components/stateViews/LoadingView"
import { Stack } from "@mui/system"
import { H6 } from "@/components/styledComponents/styledHTMLTags"

const Overview = () => {
    const router = useRouter()

    const { microbeType, assembly } = router.query

    if (!router.isReady) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    return (
        <Stack>
            <Stack spacing={2} alignItems="center" sx={{ marginTop: '16px' }}>
                <H6 sx={{ fontSize: '40px' }}>{ `${assembly} ${microbeType} Overview` }</H6>
            </Stack>

        </Stack>
    )
}

export default Overview

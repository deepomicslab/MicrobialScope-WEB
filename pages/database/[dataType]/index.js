import { useRouter } from "next/router"
import { LoadingView } from "@/components/stateViews/LoadingView"
import DatabaseContent from "@/components/pagesComponents/databasePage/DatabaseContent"
import { DatabaseContext } from "@/components/context/DatabaseContext"
import { Box } from "@mui/system"
import { H1, H2, Span } from "@/components/styledComponents/styledHTMLTags"
import { useEffect, useState } from "react"

const MicrobeDataList = () => {
    const router = useRouter()
    const { query, isReady } = router
    const { dataType } = query

    const [microbe, setMicrobe] = useState('archaea')
    const [magStatus, setMagStatus] = useState('MAG')
    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        if (!isReady) return

        if (typeof query.keyword === 'string') {
            setKeyword(query['keyword'])
        } else {
            setKeyword('')
        }
        if (typeof query.microbe === 'string') {
            setMicrobe(query['microbe'])
        }
        if (typeof query.mag === 'string') {
            setMagStatus(query['mag'])
        }
    }, [isReady, query])

    if (!isReady) {
        return <LoadingView containerSx={{ height: '80vh', marginTop: '40px' }}/>
    }

    // console.log(microbe)

    // if (microbe !== 'archaea') {
    //     return (
    //         <Box
    //             sx={{
    //                 fontFamily:
    //                     'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    //                 height: '100vh',
    //                 textAlign: 'center',
    //                 display: 'flex',
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //                 bgcolor: 'background.default',
    //                 color: 'text.primary',
    //             }}
    //         >
    //             <Box sx={{ display: 'inline-block', lineHeight: '48px' }}>
    //                 <H1
    //                     sx={{
    //                         display: 'inline-block',
    //                         margin: '0 20px 0 0',
    //                         paddingRight: '23px',
    //                         fontSize: '24px',
    //                         fontWeight: 500,
    //                         borderRight: theme => `1px solid ${
    //                             theme.palette.mode === 'dark' ? 'rgba(255,255,255,.3)' : 'rgba(0,0,0,.3)'
    //                         }`,
    //                         verticalAlign: 'top',
    //                     }}
    //                 >
    //                     404
    //                 </H1>
    //                 <Box sx={{ display: 'inline-block' }}>
    //                     <H2
    //                         sx={{
    //                             fontSize: '14px',
    //                             fontWeight: 400,
    //                             lineHeight: '28px',
    //                             margin: 0,
    //                         }}
    //                     >
    //                         This page could not be found.
    //                     </H2>
    //                 </Box>
    //             </Box>
    //         </Box>
    //     )
    // }

    return (
        <DatabaseContext.Provider
            value={{
                microbe, setMicrobe,
                magStatus, setMagStatus,
                keyword, setKeyword,
                dataType
            }}
        >
            <DatabaseContent/>
        </DatabaseContext.Provider>
    )
}

export default MicrobeDataList

import { Stack } from "@mui/system"
import { DownloadDescriptions } from "@/components/pagesComponents/downloadPage/DownloadDescriptions"

const Download = ({}) => {

    return (
        <Stack spacing={8} sx={{ px: '32px', py: '24px' }}>
            <DownloadDescriptions microbe='Archaea' magStatus='MAG'/>
            <DownloadDescriptions microbe='Archaea' magStatus='Monoisolate'/>
            <DownloadDescriptions microbe='Bacteria' magStatus='MAG'/>
            <DownloadDescriptions microbe='Bacteria' magStatus='Monoisolate'/>
            <DownloadDescriptions microbe='Fungi' magStatus='MAG'/>
            <DownloadDescriptions microbe='Fungi' magStatus='Monoisolate'/>
            <DownloadDescriptions microbe='Virus' magStatus='MAG'/>
            <DownloadDescriptions microbe='Virus' magStatus='Monoisolate'/>
        </Stack>
    )
}

export default Download

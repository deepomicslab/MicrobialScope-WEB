import { TooltipHeader, TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"

export const AntiCRISPRTooltipTemplate = (antiCRISPR) => {
    return (
        <TooltipWrapper>
            <TooltipHeader headerName={antiCRISPR.name}/>
            <TooltipItem groupName='Classification' groupValue={antiCRISPR.type}/>
            <TooltipItem groupName='Start' groupValue={antiCRISPR.start}/>
            <TooltipItem groupName='End' groupValue={antiCRISPR.end}/>
            <TooltipItem groupName='Starnd' groupValue={antiCRISPR.strand === 0 ? 'Forward' : 'Reverse'}/>
        </TooltipWrapper>
    )
}

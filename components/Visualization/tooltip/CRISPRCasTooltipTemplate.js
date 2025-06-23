import { TooltipHeader, TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"

export const CRISPRCasTooltipTemplate = (CRISPR) => {
    return (
        <TooltipWrapper>
            <TooltipHeader headerName={CRISPR.name}/>
            <TooltipItem groupName='Subtype' groupValue={CRISPR.subtype}/>
            <TooltipItem groupName='Start' groupValue={CRISPR.start}/>
            <TooltipItem groupName='End' groupValue={CRISPR.end}/>
        </TooltipWrapper>
    )
}

import { TooltipHeader, TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"

export const VirulenceFactorTooltipTemplate = (virulenceFactor) => {
    return (
        <TooltipWrapper>
            <TooltipHeader headerName={virulenceFactor.name}/>
            <TooltipItem groupName='Vfcategory' groupValue={virulenceFactor.type}/>
            <TooltipItem groupName='Start' groupValue={virulenceFactor.start}/>
            <TooltipItem groupName='End' groupValue={virulenceFactor.end}/>
            <TooltipItem groupName='Starnd' groupValue={virulenceFactor.strand === 0 ? 'Forward' : 'Reverse'}/>
        </TooltipWrapper>
    )
}

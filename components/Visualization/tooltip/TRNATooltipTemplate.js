import { TooltipHeader, TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"

export const TRNATooltipTemplate = (tRNA) => {
    return (
        <TooltipWrapper>
            <TooltipHeader headerName={tRNA.name}/>
            <TooltipItem groupName='Type' groupValue={tRNA.type}/>
            <TooltipItem groupName='Start' groupValue={tRNA.start}/>
            <TooltipItem groupName='End' groupValue={tRNA.end}/>
            <TooltipItem groupName='Starnd' groupValue={tRNA.strand === 0 ? 'Forward' : 'Reverse'}/>
        </TooltipWrapper>
    )
}

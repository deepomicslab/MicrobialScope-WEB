import { TooltipHeader, TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"

export const ProteinTooltipTemplate = (protein) => {
    return (
        <TooltipWrapper>
            <TooltipHeader headerName={protein.name}/>
            <TooltipItem groupName='COG Category' groupValue={protein.cog}/>
            <TooltipItem groupName='Product' groupValue={protein.product}/>
            <TooltipItem groupName='Start' groupValue={protein.start}/>
            <TooltipItem groupName='End' groupValue={protein.end}/>
            <TooltipItem groupName='Starnd' groupValue={protein.strand}/>
        </TooltipWrapper>
    )
}

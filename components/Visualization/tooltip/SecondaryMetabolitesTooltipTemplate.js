import { TooltipHeader, TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"

export const SecondaryMetabolitesTooltipTemplate = (secondaryMetabolites) => {
    return (
        <TooltipWrapper>
            <TooltipHeader headerName={secondaryMetabolites.name}/>
            <TooltipItem groupName='Type' groupValue={secondaryMetabolites.type}/>
            <TooltipItem groupName='Start' groupValue={secondaryMetabolites.start}/>
            <TooltipItem groupName='End' groupValue={secondaryMetabolites.end}/>
        </TooltipWrapper>
    )
}

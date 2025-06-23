import { TooltipHeader, TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"

export const AreaPlotTooltipTemplate = (headerName, start, end, value) => (
    <TooltipWrapper>
        <TooltipHeader headerName={headerName}/>
        <TooltipItem groupName='Start' groupValue={start}/>
        <TooltipItem groupName='End' groupValue={end}/>
        <TooltipItem groupName='Value' groupValue={value}/>
    </TooltipWrapper>
)

import { TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"

export const TransmembraneHelicesTooltipTemplate = (transmembraneHelices) => {
    return (
        <TooltipWrapper>
            <TooltipItem groupName='Protein' headerName={transmembraneHelices.name}/>
            <TooltipItem groupName='Position' groupValue={transmembraneHelices.type}/>
            <TooltipItem groupName='Start' groupValue={transmembraneHelices.proteinStart}/>
            <TooltipItem groupName='End' groupValue={transmembraneHelices.proteinEnd}/>
        </TooltipWrapper>
    )
}

import { TooltipHeader, TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"

export const AntibioticResistanceTooltipTemplate = (antibioticResistance) => {
    return (
        <TooltipWrapper>
            <TooltipHeader headerName={antibioticResistance.name}/>
            <TooltipItem groupName='Cut Off' groupValue={antibioticResistance.type}/>
            <TooltipItem groupName='Drug class' groupValue={antibioticResistance.drugClass}/>
            <TooltipItem groupName='Start' groupValue={antibioticResistance.start}/>
            <TooltipItem groupName='End' groupValue={antibioticResistance.end}/>
            <TooltipItem groupName='Starnd' groupValue={antibioticResistance.strand === 0 ? 'Forward' : 'Reverse'}/>
        </TooltipWrapper>
    )
}

import { TooltipHeader, TooltipItem, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"

export const SignalPeptideTooltipTemplate = (signalPeptide) => {
    return (
        <TooltipWrapper>
            <TooltipHeader headerName={signalPeptide.name}/>
            <TooltipItem groupName='Prediction' groupValue={signalPeptide.type}/>
            <TooltipItem groupName='Start' groupValue={signalPeptide.start}/>
            <TooltipItem groupName='End' groupValue={signalPeptide.end}/>
            <TooltipItem groupName='Starnd' groupValue={signalPeptide.strand === 0 ? 'Forward' : 'Reverse'}/>
        </TooltipWrapper>
    )
}

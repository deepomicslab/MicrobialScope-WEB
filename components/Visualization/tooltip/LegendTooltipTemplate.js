import { TooltipHeader, TooltipWrapper } from "@/components/Visualization/tooltip/BasicTooltipTemplate"
import React from "react"

export const LegendTooltipTemplate = (text) => {
    return (
        <TooltipWrapper>
            <TooltipHeader headerName={text}/>
        </TooltipWrapper>
    )
}

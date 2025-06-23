import { COGDict } from "@/components/Visualization/vizD3/utils/proteinsUtils"
import { LegendTooltipTemplate } from "@/components/Visualization/tooltip/LegendTooltipTemplate"

const COGCategoryLegend = ({ COGCategories, transform, toolTipRef }) => {
    const showTooltip = (event, text) => {
        toolTipRef.current.showTooltip(event, LegendTooltipTemplate(text))
    }

    const hideTooltip = () => {
        toolTipRef.current.hideTooltip()
    }

    return (
        <g transform={`translate(${transform[0]}, ${transform[1]})`}>
            {
                [...COGCategories, 'Multiply'].map((category, i) => (
                    <g key={i}>
                        <rect
                            x={calculateRectX(i)}
                            y={calculateRectY(i)}
                            width={20}
                            height={20}
                            fill={calculateFillColor(category)}
                            strokeWidth={category === 'Multiply' ? 1 : null}
                            stroke={category === 'Multiply' ? '#b0b0b0' : null}
                        ></rect>
                        <text
                            x={calculateTextX(i)}
                            y={calculateTextY(i)}
                            fill='#818181'
                            textAnchor='start'
                            dy='.35em'
                        >{calculateText(category)}</text>
                        <rect
                            x={calculateRectX(i)}
                            y={calculateRectY(i)}
                            width={220}
                            height={20}
                            fill='transparent'
                            onPointerMove={(event) => showTooltip(event, COGDict[category].name)}
                            onPointerLeave={hideTooltip}
                        />
                    </g>
                ))
            }
        </g>
    )
}

const calculateRectX = (i) => ((i / 6) | 0) * 220 + 50
const calculateRectY = (i) => (i % 6) * 30 + 35
const calculateFillColor = (category) => COGDict[category].color

const calculateTextX = (i) => ((i / 6) | 0) * 220 + 75
const calculateTextY = (i) => (i % 6) * 30 + 45
const calculateText = (category) => {
    const name =
        COGDict[category].abbr ? `${COGDict[category].abbr}-${COGDict[category].name}` : COGDict[category].name

    if (name.length > 20) {
        return `${name.substring(0, 20)}...`
    }

    return name
}


export default COGCategoryLegend

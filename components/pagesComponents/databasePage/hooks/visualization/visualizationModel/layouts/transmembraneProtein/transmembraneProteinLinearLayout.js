import * as d3 from "d3"

const transmembraneProteinLinearLayout = (shared) => {
    const { svgWidth } = shared

    const vizConfig = {
        linear: {
            height: 720,
        },
        areaPlot: {
            height: 160,
            width: 900
        },
        axis: {
            width: 1080,
            y: 625
        },
        gcSkew: {
            bandWidth: 180,
            gcContentStyle: { color: '#367dd6', name: 'GC Content' },
            skewPlusStyle: { color: '#fb475e', name: 'GC Skew+' },
            skewMinusStyle: { color: '#019992', name: 'GC Skew-' },
        },
        protein: {
            gap: 20,
            arrowWidth: 20
        },
        transmembraneProtein: {
            gap: 60,
            arrowWidth: 20
        },
        GCLegend: {
            gap: 30
        },
        COGCategoryLegend: {
            mt: 20
        },
    }

    const linearScale = d3.scaleLinear()
        .domain(shared.domain)
        .range([0, vizConfig.axis.width])

    const svgHeight =
        vizConfig.linear.height +
        vizConfig.areaPlot.height +
        vizConfig.COGCategoryLegend.mt +
        6 * 30 + 35

    const xOffset = (svgWidth - vizConfig.axis.width) / 2

    const gcContentYBase = vizConfig.axis.y - vizConfig.gcSkew.bandWidth
    const gcSkewYBase = gcContentYBase - vizConfig.gcSkew.bandWidth
    const proteinsYBase = gcSkewYBase - vizConfig.protein.gap - vizConfig.protein.arrowWidth / 2
    const transmembraneProteinYBase = proteinsYBase - vizConfig.transmembraneProtein.gap - vizConfig.transmembraneProtein.arrowWidth / 2

    return {
        svgHeight,
        linearScale,
        vizConfig,
        xOffset,
        gcContentYBase,
        gcSkewYBase,
        proteinsYBase,
        transmembraneProteinYBase
    }
}

export default transmembraneProteinLinearLayout

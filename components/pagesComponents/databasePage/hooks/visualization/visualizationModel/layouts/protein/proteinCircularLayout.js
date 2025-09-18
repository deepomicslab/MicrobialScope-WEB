import * as d3 from "d3"

const proteinCircularLayout = (shared) => {
    const { svgWidth } = shared

    const vizConfig = {
        circular: {
            height: 720,
            angle: 350 * (Math.PI / 180)
        },
        areaPlot: {
            height: 160,
            width: 900
        },
        axis: {
            radius: 120
        },
        gcSkew: {
            bandWidth: 80,
            gcContentStyle: { color: '#367dd6', name: 'GC Content' },
            skewPlusStyle: { color: '#fb475e', name: 'GC Skew+' },
            skewMinusStyle: { color: '#019992', name: 'GC Skew-' },
        },
        protein: {
            radius: 290,
            arrowWidth: 20
        },
        GCLegend: {
            gap: 30
        },
        COGCategoryLegend: {
            mt: 20
        },
        productLabel: {
            radius: 335
        }
    }

    const cx = svgWidth / 2
    const cy = vizConfig.circular.height / 2

    const angleScale = d3.scaleLinear()
        .domain(shared.domain)
        .range([0, vizConfig.circular.angle])

    const svgHeight =
        vizConfig.circular.height +
        vizConfig.areaPlot.height +
        vizConfig.COGCategoryLegend.mt +
        6 * 30 + 35

    const gcContentRadiusBase = vizConfig.axis.radius
    const gcContentRadiusMid = gcContentRadiusBase + vizConfig.gcSkew.bandWidth / 2

    const gcSkewRadiusBase = gcContentRadiusBase + vizConfig.gcSkew.bandWidth
    const gcSkewRadiusMid = gcSkewRadiusBase + vizConfig.gcSkew.bandWidth / 2

    return {
        svgHeight,
        cx,
        cy,
        angleScale,
        vizConfig,
        gcContentRadiusBase,
        gcContentRadiusMid,
        gcSkewRadiusBase,
        gcSkewRadiusMid
    }
}

export default proteinCircularLayout

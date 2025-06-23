const gcTypeDict = [
    { color: '#367dd6', name: 'GC Content' },
    { color: '#fb475e', name: 'GC Skew+' },
    { color: '#019992', name: 'GC Skew-' },
]

const GCLegend = ({ transform, legendGap }) => (
    <g className='GCLegend' transform={`translate(${transform[0]}, ${transform[1]})`}>
        {
            gcTypeDict.map((gcType, index) => (
                <g key={index} transform={`translate(0, ${legendGap * (index)})`}>
                    <rect width='20' height='20' fill={gcType.color}></rect>
                    <text x='40' y='10' textAnchor='start' dy='.35em'>{gcType.name}</text>
                </g>
            ))
        }
    </g>
)

export default GCLegend

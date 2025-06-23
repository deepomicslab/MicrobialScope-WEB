const ContigVizInfos = ({
    contigName,
    contigLength,
    displayRange,
    maxRange
}) => (
    <foreignObject x="20" y="20" width="350" height="200">
        <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{
                fontSize: '14px',
                color: 'black',
                backgroundColor: '#f7f7f7',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                maxWidth: '350px',
                maxHeight: '200px',
                overflow: 'auto'
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>Contig:</strong>
                    <span>{contigName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>Contig Length:</strong>
                    <span>{contigLength.toLocaleString()} bp</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>Displayed Range:</strong>
                    <span>{parseInt(displayRange[0]).toLocaleString()} - {parseInt(displayRange[1]).toLocaleString()} bp</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>Current Window Size:</strong>
                    <span>
                {(parseInt(displayRange[1]) - parseInt(displayRange[0])).toLocaleString()} bp
            </span>
                </div>
            </div>
        </div>
    </foreignObject>
)

export default ContigVizInfos

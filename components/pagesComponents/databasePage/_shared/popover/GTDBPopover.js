import { Image, Popover } from "antd"
import { Box } from "@mui/system"

const labelMap = {
    'domain': 'Domain',
    'phylum': 'Phylum',
    'class_name': 'Class',
    'order': 'Order',
    'family': 'Family',
    'genus': 'Genus',
    'species': 'Species'
}

const Content = ({ otherFields }) => {
    return (
        <Box sx={{ paddingX: '8px' }}>
            <h3 style={{ marginBottom: '12px', color: '#1890ff', fontSize: '20px' }}>GTDB Taxonomy</h3>
            {Object.entries(otherFields).map(([key, value]) => (
                <div key={key} style={{ marginBottom: '8px', fontSize: '14px' }}>
                    <strong style={{ color: '#333' }}>{labelMap[key]}:</strong> <span style={{ color: '#555' }}>{value}</span>
                </div>
            ))}
        </Box>
    )
}

const GTDBPopover = ({ gtdb }) => {
    const { unique_id, tax, ...otherFields } = gtdb

    return (
        <Popover
            content={<Content otherFields={otherFields}/>}
            trigger='click'
            styles={{
                root: {
                    padding: '0px'
                }
            }}
        >
            <Image
                src='/GTDB.ico'
                alt='GTDB Icon'
                width={24}
                height={24}
                preview={false}
            />
        </Popover>
    )
}

export default GTDBPopover

import { Card, Select, Typography } from "antd"
import { H6 } from "@/components/styledComponents/styledHTMLTags"

const { Text } = Typography
const { Option } = Select

const SequenceSelectorCard = ({ sequences, selectedSequence, handleSequenceChange }) => {
    return (
        <Card
            style={{ width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            title={
                <H6 sx={{ fontSize: '28px', mt: '12px', mb: '12px', fontWeight: 600 }}>
                    Sequence Selector
                </H6>
            }
        >
            <Text type="secondary" style={{ fontSize: '20px' }}>
                Select a sequence to view sequence-specific features or annotations.
            </Text>

            <Select
                style={{ width: '100%', marginTop: 16 }}
                placeholder="Please select a sequence"
                onChange={handleSequenceChange}
                value={selectedSequence}
                size='large'
            >
                {sequences.map((sequence) => (
                    <Option key={sequence?.id} value={sequence?.['Acession_ID']} style={{ fontSize: '16px' }}>
                        {sequence?.['Acession_ID']} – {sequence?.length?.toLocaleString()} bp
                    </Option>
                ))}
            </Select>
        </Card>
    )
}

export default SequenceSelectorCard

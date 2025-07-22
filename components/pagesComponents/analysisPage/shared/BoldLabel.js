import { Span } from "@/components/styledComponents/styledHTMLTags"

const BoldLabel = ({ text }) => (
    <Span sx={{ fontWeight: 'bold' }}>
        {text}
    </Span>
)

export default BoldLabel

import { Alert } from "antd"
import { Span } from "@/components/styledComponents/styledHTMLTags"

const BasicInfo = () => (
    <Span sx={{ fontSize: '16px' }}>
        It takes a few minutes to <Span sx={{ color: 'red' }}>RUN DEMO</Span>. Click <Span sx={{ color: 'red' }}>VIEW DEMO RESULT</Span> to see the precomputed demo results immediately.
    </Span>
)

export const AnalysisBasicAlert = ({ info=<BasicInfo/> }) => {
    return (
        <Alert message={info} type="info" showIcon />
    )
}

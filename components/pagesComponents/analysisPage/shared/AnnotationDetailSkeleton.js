import { Card, Skeleton } from "antd"
import { H6 } from "@/components/styledComponents/styledHTMLTags"
import { Stack } from "@mui/system"

const AnnotationDetailSkeleton = ({ annotationItem }) => (
    <Card
        style={{ width: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
        title={
            <H6 sx={{ fontSize: '28px', mt: '12px', mb: '12px', fontWeight: 600 }}>
                Sequence Detail
            </H6>
        }
    >
        <Stack>
            <H6 sx={{
                fontSize: '24px',
                m: '0px',
                paddingBottom: '32px',
                fontWeight: 500
            }}>
                Sequence Information
            </H6>
            <Skeleton active paragraph={{ rows: 6 }}/>
        </Stack>
        <Stack>
            <H6 sx={{
                fontSize: '24px',
                m: '0px',
                paddingBottom: '32px',
                fontWeight: 500
            }}>
                Annotated {annotationItem} List
            </H6>
            <Skeleton active paragraph={{ rows: 6 }}/>
        </Stack>
        <Stack>
            <H6 sx={{
                fontSize: '24px',
                m: '0px',
                paddingBottom: '32px',
                fontWeight: 500
            }}>
                Annotated {annotationItem} Map
            </H6>
            <Skeleton active paragraph={{ rows: 6 }}/>
        </Stack>
    </Card>
)



export default AnnotationDetailSkeleton

import { Alert } from "antd"
import { Box } from "@mui/system"
import Link from "next/link"
import { ReadOutlined } from "@ant-design/icons"

const PublicationAlertInfo = () => (
    <Box component='span' sx={{ fontSize: '16px' }}>
        Xikang Feng, Yinhu Li, Jieyi Zheng, Xuhua Chen, Shuo Yang, Yu Chen, Shuai Cheng Li, MicrobialScope: an
        integrated genomic resource with rich annotations across bacteria, archaea, fungi, and viruses, Nucleic Acids
        Research, 2025;, gkaf1234, <Link target='_blank'
                                         href='https://doi.org/10.1093/nar/gkaf1234'>https://doi.org/10.1093/nar/gkaf1234</Link>
    </Box>
)

const PublicationAlertTitle = () => (
    <Box component='span' sx={{ fontWeight: 'bold', fontSize: '20px' }}>
        Publication:
    </Box>
)

const PublicationAlertIcon = () => (
    <ReadOutlined style={{ fontSize: '30px', color: 'rgb(22, 119, 255)', marginRight: '12px' }}/>
)

const PublicationAlert = ({}) => (
    <Alert
        message={<PublicationAlertTitle/>}
        description={<PublicationAlertInfo/>}
        icon={<PublicationAlertIcon/>}
        type='info'
        showIcon
    />
)

export default PublicationAlert

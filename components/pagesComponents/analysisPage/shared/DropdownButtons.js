import { Button } from "antd"
import { A } from "@/components/styledComponents/styledHTMLTags"
import { FileOutlined } from "@ant-design/icons"

export const DropdownDownloadDemoButton = ({ href }) => (
    <A target='_blank' rel="noopener noreferrer" href={href}>
        <Button
            type='primary'
            icon={<FileOutlined/>}
        >
            See Example FASTA
        </Button>
    </A>
)

import { Button, Dropdown } from "antd"
import { A } from "@/components/styledComponents/styledHTMLTags"
import { FileOutlined } from "@ant-design/icons"

const dropdownDownloadDemoItems = [
    {
        key: '1',
        label: (
            <A target="_blank" rel="noopener noreferrer" href="/demoData/GCA_000970025.1.fna">
                Archaea
            </A>
        ),
    },
    {
        key: '2',
        label: (
            <A target="_blank" rel="noopener noreferrer" href="/demoData/GCA_000005845.2.fna">
                Bacteria
            </A>
        )
    },
    {
        key: '3',
        label: (
            <A target="_blank" rel="noopener noreferrer" href="/demoData/GCA_000146045.2.fna">
                Fungi
            </A>
        )
    },
    {
        key: '4',
        label: (
            <A target="_blank" rel="noopener noreferrer" href="/demoData/GCA_009858895.3.fna">
                Viruses
            </A>
        )
    }
]

export const DropdownDownloadDemoButton = ({}) => (
    <Dropdown menu={{ items: dropdownDownloadDemoItems }}>
        <Button
            type='primary'
            icon={<FileOutlined/>}
        >
            See Example FASTA
        </Button>
    </Dropdown>
)

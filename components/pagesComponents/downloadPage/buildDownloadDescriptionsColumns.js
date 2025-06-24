import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import { Stack } from "@mui/system"
import { downloadSingleFile, getMetaFileURL } from "@/dataFetch/get"
import { Span } from "@/components/styledComponents/styledHTMLTags"

export const buildDownloadDescriptionsColumns = (microbe, magStatus) => {
    const columns = [
        {
            key: '1',
            label: <LabelWrapper label='Genomes'/>,
            children: (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                    <DownloadButton text='Download XLS' microbe={microbe} magStatus={magStatus} baseFileName='.genome_list.xls' type='xls'/>
                    <DownloadButton text='Download TSV' microbe={microbe} magStatus={magStatus} baseFileName='.genome_list.xls' type='tsv'/>
                </Stack>
            ),
        },
        {
            key: '2',
            label: <LabelWrapper label='Proteins'/>,
            children: (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                    <DownloadButton text='Download XLS' microbe={microbe} magStatus={magStatus} baseFileName='.protein_list.xls' type='xls'/>
                    <DownloadButton text='Download TSV' microbe={microbe} magStatus={magStatus} baseFileName='.protein_list.xls' type='tsv'/>
                </Stack>
            ),
        },
        {
            key: '3',
            label: <LabelWrapper label='tRNAs'/>,
            children: (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                    <DownloadButton text='Download XLS' microbe={microbe} magStatus={magStatus} baseFileName='.tRNA_list.xls' type='xls'/>
                    <DownloadButton text='Download TSV' microbe={microbe} magStatus={magStatus} baseFileName='.tRNA_list.xls' type='tsv'/>
                </Stack>
            ),
        },
        {
            key: '4',
            label: <LabelWrapper label='CRISPR/Cas Systems'/>,
            children: (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                    <DownloadButton text='Download XLS' microbe={microbe} magStatus={magStatus} baseFileName='.CRISPRCas_list.xls' type='xls'/>
                    <DownloadButton text='Download TSV' microbe={microbe} magStatus={magStatus} baseFileName='.CRISPRCas_list.xls' type='tsv'/>
                </Stack>
            ),
            visible: microbe !== 'Fungi',
        },
        {
            key: '5',
            label: <LabelWrapper label='Anti-CRISPR Proteins'/>,
            children: (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                    <DownloadButton text='Download XLS' microbe={microbe} magStatus={magStatus} baseFileName='.antiCRISPR_list.xls' type='xls'/>
                    <DownloadButton text='Download TSV' microbe={microbe} magStatus={magStatus} baseFileName='.antiCRISPR_list.xls' type='tsv'/>
                </Stack>
            ),
            visible: microbe !== 'Fungi',
        },
        {
            key: '6',
            label: <LabelWrapper label='Secondary Metabolites'/>,
            children: (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                    <DownloadButton text='Download XLS' microbe={microbe} magStatus={magStatus} baseFileName='.SMs_list.xls' type='xls'/>
                    <DownloadButton text='Download TSV' microbe={microbe} magStatus={magStatus} baseFileName='.SMs_list.xls' type='tsv'/>
                </Stack>
            ),
            visible: microbe !== 'Viruses',
        },
        {
            key: '7',
            label: <LabelWrapper label='Signal Peptides'/>,
            children: (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                    <DownloadButton text='Download XLS' microbe={microbe} magStatus={magStatus} baseFileName='.SP_list.xls' type='xls'/>
                    <DownloadButton text='Download TSV' microbe={microbe} magStatus={magStatus} baseFileName='.SP_list.xls' type='tsv'/>
                </Stack>
            ),
            visible: microbe !== 'Viruses',
        },
        {
            key: '8',
            label: <LabelWrapper label='Virulence Factors'/>,
            children: (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                    <DownloadButton text='Download XLS' microbe={microbe} magStatus={magStatus} baseFileName='.VF_list.xls' type='xls'/>
                    <DownloadButton text='Download TSV' microbe={microbe} magStatus={magStatus} baseFileName='.VF_list.xls' type='tsv'/>
                </Stack>
            ),
        },
        {
            key: '9',
            label: <LabelWrapper label='Antibiotic Resistance Genes'/>,
            children: (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                    <DownloadButton text='Download XLS' microbe={microbe} magStatus={magStatus} baseFileName='.ARG_list.xls' type='xls'/>
                    <DownloadButton text='Download TSV' microbe={microbe} magStatus={magStatus} baseFileName='.ARG_list.xls' type='tsv'/>
                </Stack>
            ),
        },
        {
            key: '10',
            label: <LabelWrapper label='Transmembrane Helices'/>,
            children: (
                <Stack alignItems="center" direction="row" justifyContent="center" spacing={2}>
                    <DownloadButton text='Download XLS' microbe={microbe} magStatus={magStatus} baseFileName='.TMHs_list.xls' type='xls'/>
                    <DownloadButton text='Download TSV' microbe={microbe} magStatus={magStatus} baseFileName='.TMHs_list.xls' type='tsv'/>
                </Stack>
            ),
        },
    ];

    return columns.filter(column => column.visible !== false);
}

const LabelWrapper = ({ label }) => (
    <Span sx={{ fontWeight: 600, fontSize: '18px' }}>
        {label}
    </Span>
)

const DownloadButton = ({ text, microbe, magStatus, baseFileName, type }) => (
    <Button
        icon={<DownloadOutlined/>}
        type='primary'
        onClick={() => downloadSingleFile(
            `${getMetaFileURL}?microbe=${microbe}&magStatus=${magStatus}&baseFileName=${baseFileName}&type=${type}`
        )}
    >
        {text}
    </Button>
)

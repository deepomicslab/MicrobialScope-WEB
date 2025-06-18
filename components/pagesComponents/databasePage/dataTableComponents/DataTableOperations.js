import { Stack } from "@mui/system"
import { useState } from "react"
import { Badge, Button, Dropdown, notification, Tooltip } from "antd"
import {
    CloudDownloadOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
} from "@ant-design/icons"
import { Span } from "@/components/styledComponents/styledHTMLTags"
import DataTableSearchBar from "@/components/pagesComponents/databasePage/dataTableComponents/DataTableSearchBar"
import {
    buildDownloadDropdownItems
} from "@/components/pagesComponents/databasePage/dataTableComponents/DownloadButtonDropdownItems"
import { useDatabaseContext } from "@/components/context/DatabaseContext"
import { DATABASECONFIG } from "@/components/pagesComponents/databasePage/DatabaseContent"

const DataTableOperations = ({
    dataCount,
    selectedRowInfo,
    showLeft,
    setShowLeft,
    setSearchText,
    columnVisibilityMap,
    setColumnVisibilityMap,
    refreshColumns,
    showAllColumns,
    setColumns,
    selectedFilterOptions
}) => {
    return (
        <Stack direction="row" justifyContent="space-between">
            <DataTableButtonGroup
                showLeft={showLeft}
                setShowLeft={setShowLeft}
                selectedRowInfo={selectedRowInfo}
                selectedFilterOptions={selectedFilterOptions}
                dataCount={dataCount}
            />
            <DataTableSearchBar
                dataCount={dataCount}
                setSearchText={setSearchText}
                columnVisibilityMap={columnVisibilityMap}
                setColumnVisibilityMap={setColumnVisibilityMap}
                refreshColumns={refreshColumns}
                showAllColumns={showAllColumns}
                setColumns={setColumns}
            />
        </Stack>
    )
}

const DataTableButtonGroup = ({ showLeft, setShowLeft, selectedRowInfo, selectedFilterOptions, dataCount }) => {
    return (
        <Stack direction="row" spacing={1}>
            <SplitterControlButton showLeft={showLeft} setShowLeft={setShowLeft}/>
            <DownloadButton selectedRowInfo={selectedRowInfo} selectedFilterOptions={selectedFilterOptions}
                            total={dataCount}/>
        </Stack>
    )
}

const SplitterControlButton = ({ showLeft, setShowLeft }) => {
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setShowLeft(prev => !prev)
        setOpen(false)
    }

    const handleMouseEnter = () => {
        setOpen(true)
    }

    const handleMouseLeave = () => {
        setOpen(false)
    }

    return (
        <Tooltip placement="top" title={`${showLeft ? 'Close' : 'Open'} Filter Options`} open={open}>
            {
                showLeft ? (
                    <Button
                        shape="circle"
                        icon={<DoubleLeftOutlined/>}
                        onClick={handleClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                ) : (
                    <Button
                        shape="circle"
                        icon={<DoubleRightOutlined/>}
                        onClick={handleClick}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                )
            }
        </Tooltip>
    )
}

const DownloadButton = ({ selectedRowInfo, selectedFilterOptions, total }) => {
    const { microbe, magStatus, dataType } = useDatabaseContext()
    const url = DATABASECONFIG[microbe][magStatus][dataType]['endpointBatchDownload']

    const openLoadingMessage = () => {
        notification.info({
            key: 'downloadNotification',
            message: 'Download...',
            description: 'Processing data... your download will begin shortly.',
            placement: 'top'
        })
    }

    const items = buildDownloadDropdownItems(
        selectedRowInfo,
        selectedFilterOptions,
        total,
        openLoadingMessage,
        url,
        [
            { key: 'meta', label: 'Download Meta' },
            { key: 'fasta', label: 'Download FASTA' },
            { key: 'gbk', label: 'Download GBK' },
            { key: 'gff3', label: 'Download GFF3' }
        ]
    )

    return (
        <Dropdown menu={{ items }}>
            <Button
                color="primary"
                icon={<Badge count={selectedRowInfo.rowKeys.length} showZero overflowCount={Infinity}/>}
                iconPosition="end"
            >
                <Stack direction="row" spacing={0.5} alignItems="center">
                    <CloudDownloadOutlined style={{ fontSize: '16px' }}/>
                    <Span>Download</Span>
                </Stack>
            </Button>
        </Dropdown>
    )
}

export default DataTableOperations

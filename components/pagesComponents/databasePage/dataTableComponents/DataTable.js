import { useEffect, useState } from "react"
import axios from "axios"
import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import { Badge, Button, Popover, Table, Input, Flex, Typography, Switch, Tooltip, Statistic } from "antd"
import { Box, Stack } from "@mui/system"
import { DoubleLeftOutlined, DoubleRightOutlined, MenuOutlined } from "@ant-design/icons"
import { produce } from "immer"
import { H6, Hr, Span } from "@/components/styledComponents/styledHTMLTags"
import { DATABASECONFIG } from "@/components/pagesComponents/databasePage/DatabaseContent"

const DataTable = ({ microbe, dataType, selectedFilterOptions, showLeft, setShowLeft }) => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [selectedRowInfo, setSelectedRowInfo] = useState({
        rowKeys: [],
        rows: []
    })
    const [loading, setLoading] = useState(false)
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    })

    const columns = DATABASECONFIG[microbe][dataType]['columns']
    const rowSelection = {
        selectedRowKeys: selectedRowInfo.rowKeys,
        columnWidth: '56px',
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowInfo({
                rowKeys: selectedRowKeys,
                rows: selectedRows
            })
        },
        preserveSelectedRowKeys: true,
        selections: [
            Table.SELECTION_INVERT,
            Table.SELECTION_NONE
        ],
    }

    const fetchData = () => {
        setLoading(true)
        axios.post(
            DATABASECONFIG[microbe][dataType]['endpointList'],
            {
                ...tableParams,
                filterOptions: selectedFilterOptions
            }
        ).then(
            (response) => response.data
        ).then(
            ({ count, results }) => {
                setData(results)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: count,
                    }
                })
                setTotal(count)
            }
        ).finally(() => setLoading(false))
    }

    useEffect(fetchData, [
        microbe,
        dataType,
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        selectedFilterOptions
    ])

    const handleTableChange = (pagination, _, sorter) => {
        setTableParams({
            pagination,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.field,
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    }

    return (
        <Stack spacing={2}>
            <TableHeader
                microbe={microbe}
                dataType={dataType}
                showLeft={showLeft}
                setShowLeft={setShowLeft}
                selectedRowInfo={selectedRowInfo}
                dataCount={total}
            />
            <StyledTable
                columns={columns}
                rowSelection={rowSelection}
                rowKey={(record) => record['id']}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                scroll={{ x: 'max-content' }}
                onChange={handleTableChange}
            />
        </Stack>
    )
}

const TableHeader = ({ microbe, dataType, showLeft, setShowLeft, selectedRowInfo, dataCount }) => {
    const selectedCount = selectedRowInfo.rowKeys.length

    return (
        <Stack direction="row" justifyContent="space-between">
            <ButtonGroup showLeft={showLeft} setShowLeft={setShowLeft} selectedCount={selectedCount}/>
            <SearchBar microbe={microbe} dataType={dataType} dataCount={dataCount}/>
        </Stack>
    )
}

const SearchBar = ({ microbe, dataType, dataCount }) => {
    const [searchText, setSearchText] = useState('')

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
    }

    const onSearch = () => {
        console.log('search')
    }

    const [fields, setFields] = useState(
        buildColumnFields(DATABASECONFIG[microbe][dataType]['columns'].filter(column => column.title !== 'Action'))
    )

    const handleSwitchChange = (value) => {
        setFields(
            produce(draft => {
                const field = draft.find(field => field.value === value)
                field.checked = !field.checked
            })
        )
    }

    return (
        <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: '20px' }}>
                <Span>TOTAL OF </Span>
                <Statistic value={dataCount} valueStyle={{ fontSize: '20px', fontWeight: 700 }}/>
                <Span> { dataType.toUpperCase() }</Span>
            </Stack>
            <Stack direction="row" spacing={1}>
                <Input.Search
                    placeholder="Search..."
                    allowClear
                    value={searchText}
                    onChange={handleSearchTextChange}
                    onSearch={(value) => onSearch(value)}
                    style={{
                        width: 200,
                    }}
                />
                <Popover
                    placement="bottomRight"
                    content={<TableSearchFieldSwitchList fields={fields} handleSwitchChange={handleSwitchChange}/>}
                    trigger={['click']}
                    overlayInnerStyle={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '8px',
                        boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px',
                        padding: '4px'
                    }}
                >
                    <Button icon={<MenuOutlined/>} style={{ color: '#276D8C', borderColor: '#276D8C' }}/>
                </Popover>
            </Stack>
        </Stack>
    )
}

const buildColumnFields = (columns) => {
    return columns.map(
        column => ({
            text: column['title'],
            value: column['dataIndex'],
            checked: true,
        })
    )
}

const TableSearchFieldSwitchList = ({ fields, handleSwitchChange }) => {
    return (
        <Flex
            vertical
            gap={1}
        >
            <Box sx={{ margin: '4px 4px 4px 4px' }}>
                <H6 sx={{ fontWeight: 500, fontSize: '16px', margin: '0px' }}>Columns:</H6>
            </Box>
            <Hr/>
            {
                fields.map(
                    field => (
                        <Flex
                            key={field.value}
                            justify="space-between"
                            align="center"
                            gap={24}
                            style={{
                                padding: '2px 6px'
                            }}
                        >
                            <Typography sx={{ fontSize: '14px' }}>{field.text}</Typography>
                            <Switch
                                size="small"
                                checked={field.checked}
                                onChange={() => handleSwitchChange(field.value)}
                            />
                        </Flex>
                    )
                )
            }
        </Flex>
    )
}

const ButtonGroup = ({ showLeft, setShowLeft, selectedCount }) => {
    return (
        <Stack direction="row" spacing={1}>
            <SplitterControlButton showLeft={showLeft} setShowLeft={setShowLeft}/>
            <DownloadButton selectedCount={selectedCount}/>
        </Stack>
    )
}

const SplitterControlButton = ({ showLeft, setShowLeft }) => {
    const handleClick = () => {
        setShowLeft(prev => !prev)
    }

    return (
        <Tooltip placement="top" title={`${showLeft ? 'Close' : 'Open'} Filter Options`}>
            {
                showLeft ? (
                    <Button
                        shape="circle"
                        icon={<DoubleLeftOutlined />}
                        onClick={handleClick}
                    />
                ) : (
                    <Button
                        shape="circle"
                        icon={<DoubleRightOutlined />}
                        onClick={handleClick}
                    />
                )
            }
        </Tooltip>
    )
}

const DownloadButton = ({ selectedCount }) => {
    return (
        <Button
            color="primary"
            icon={<Badge count={selectedCount} showZero overflowCount={Infinity}/>}
            iconPosition="end"
        >
            Download
        </Button>
    )
}

export default DataTable

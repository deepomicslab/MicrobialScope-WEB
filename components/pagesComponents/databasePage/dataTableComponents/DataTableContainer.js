import { useCallback, useEffect, useState } from "react"
import { Stack } from "@mui/system"
import axios from "axios"
import { DATABASECONFIG } from "@/components/pagesComponents/databasePage/DatabaseContent"
import DataTable from "@/components/pagesComponents/databasePage/dataTableComponents/DataTable"
import DataTableOperations from "@/components/pagesComponents/databasePage/dataTableComponents/DataTableOperations"
import { produce } from "immer"
import { useDatabaseContext } from "@/components/context/DatabaseContext"
import { useDatabaseDetailModalContext } from "@/components/context/DatabaseDetailModalContext"
import { fieldMap } from "@/components/pagesComponents/databasePage/dataTableComponents/DataTableSearchBar"

const DataTableContainer = ({ selectedFilterOptions, showLeft, setShowLeft }) => {
    const { microbe, magStatus, dataType, keyword } = useDatabaseContext()
    const { handleDetailClick } = useDatabaseDetailModalContext()

    const [tableData, setTableData] = useState([])
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
        }
    })
    const [columnVisibilityMap, setColumnVisibilityMap] = useState(
        buildColumnVisibilityMap(
            DATABASECONFIG[microbe][magStatus][dataType]['columns'](
                handleDetailClick,
                DATABASECONFIG[microbe][magStatus][dataType]['endpointSingleDownload']
            ).filter(
                column => column.title !== 'Action'
            )
        )
    )
    const [searchContent, setSearchContent] = useState({
        field: fieldMap[microbe],
        value: ''
    })
    const [columns, setColumns] = useState([])
    const [filterTrigger, setFilterTrigger] = useState(0)

    const handleSearContentChange = (newSearchContent) => {
        setSearchContent(newSearchContent)
    }

    const fetchData = useCallback((
        microbe,
        magStatus,
        dataType,
        filterOptions,
        searchContent
    ) => {
        setLoading(true)
        axios.post(
            DATABASECONFIG[microbe][magStatus][dataType]['endpointList'],
            {
                ...tableParams,
                filterOptions: filterOptions,
                searchContent: searchContent
            }
        ).then(res => res.data)
            .then(({ count, results }) => {
                setTableData(results)
                setTableParams(prev => ({
                    ...prev,
                    pagination: {
                        ...prev.pagination,
                        total: count
                    }
                }))
                setTotal(count)
            }).finally(() => setLoading(false))
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField
    ])

    const rebuildColumns = useCallback(() => {
        const base = DATABASECONFIG[microbe][magStatus][dataType]['columns'](
            handleDetailClick,
            DATABASECONFIG[microbe][magStatus][dataType]['endpointSingleDownload']
        )
        const filteredBase = base.filter(col => col.title !== 'Action')

        const map = buildColumnVisibilityMap(filteredBase)

        const visibleColumns = map
            .filter(item => item.visible)
            .map(item => filteredBase.find(col => col.dataIndex === item.value))
            .filter(Boolean)

        const operationCol = base.find(col => col.key === 'operation')
        const finalColumns = operationCol ? [...visibleColumns, operationCol] : visibleColumns

        setColumnVisibilityMap(map)
        setColumns(finalColumns)
    }, [dataType, handleDetailClick, magStatus, microbe])

    const showAllColumns = useCallback(() => {
        setColumnVisibilityMap(prevMap => {
            const newMap = produce(prevMap, draft => {
                draft.forEach(item => {
                    item.visible = true
                })
            })

            const base = DATABASECONFIG[microbe][magStatus][dataType]['columns'](
                handleDetailClick,
                DATABASECONFIG[microbe][magStatus][dataType]['endpointSingleDownload']
            )
            const visibleColumns = newMap
                .filter(col => col.visible)
                .map(col => base.find(item => item.dataIndex === col.value))
                .filter(Boolean)
            const operation = base.find(item => item.key === 'operation')
            setColumns(operation ? [...visibleColumns, operation] : visibleColumns)

            return newMap
        })
    }, [dataType, handleDetailClick, magStatus, microbe])

    useEffect(() => {
        rebuildColumns()
    }, [rebuildColumns])

    useEffect(() => {
        setTableParams(prev => ({
                ...prev,
                pagination: {
                    ...prev.pagination,
                    current: 1
                }
            })
        )
        setFilterTrigger(prev => prev + 1)
    }, [microbe, magStatus, selectedFilterOptions])

    useEffect(() => {
        fetchData(
            microbe,
            magStatus,
            dataType,
            selectedFilterOptions,
            searchContent
        )
    }, [dataType, fetchData, searchContent, filterTrigger])

    useEffect(() => {
        setSearchContent(prev => ({
            ...prev,
            value: keyword
        }))
    }, [keyword])

    return (
        <Stack spacing={2}>
            <DataTableOperations
                dataCount={total}
                selectedRowInfo={selectedRowInfo}
                showLeft={showLeft}
                setShowLeft={setShowLeft}
                columnVisibilityMap={columnVisibilityMap}
                setColumnVisibilityMap={setColumnVisibilityMap}
                refreshColumns={rebuildColumns}
                showAllColumns={showAllColumns}
                setColumns={setColumns}
                selectedFilterOptions={selectedFilterOptions}
                searchContent={searchContent}
                handleSearContentChange={handleSearContentChange}
            />
            <DataTable
                columns={columns}
                selectedRowInfo={selectedRowInfo}
                setSelectedRowInfo={setSelectedRowInfo}
                tableParams={tableParams}
                setTableParams={setTableParams}
                tableData={tableData}
                setTableData={setTableData}
                loading={loading}
            />
        </Stack>
    )
}

const buildColumnVisibilityMap = (columns) => {
    return columns.map(
        column => ({
            text: column['title'],
            value: column['dataIndex'],
            visible: true,
        })
    )
}

export default DataTableContainer

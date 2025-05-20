import { useCallback, useEffect, useState } from "react"
import { Stack } from "@mui/system"
import axios from "axios"
import { DATABASECONFIG } from "@/components/pagesComponents/databasePage/DatabaseContent"
import DataTable from "@/components/pagesComponents/databasePage/dataTableComponents/DataTable"
import DataTableOperations from "@/components/pagesComponents/databasePage/dataTableComponents/DataTableOperations"
import { produce } from "immer"
import { useDatabaseContext } from "@/components/context/DatabaseContext"

const DataTableContainer = ({ selectedFilterOptions, showLeft, setShowLeft }) => {
    const { microbe, dataType } = useDatabaseContext()
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
    const [searchText, setSearchText] = useState('')
    const [columnVisibilityMap, setColumnVisibilityMap] = useState(
        buildColumnVisibilityMap(
            DATABASECONFIG[microbe][dataType]['columns'].filter(
                column => column.title !== 'Action'
            )
        )
    )
    const [columns, setColumns] = useState([])

    const fetchData = () => {
        setLoading(true)
        axios.post(
            DATABASECONFIG[microbe][dataType]['endpointList'],
            {
                ...tableParams,
                filterOptions: selectedFilterOptions,
                searchContent: searchText
            }
        ).then(
            (response) => response.data
        ).then(
            ({ count, results }) => {
                setTableData(results)
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

    const handleDownload = () => {

    }

    const rebuildColumns = useCallback(() => {
        const base = DATABASECONFIG[microbe][dataType]['columns']
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
    }, [dataType, microbe])

    const showAllColumns = useCallback(() => {
        setColumnVisibilityMap(prevMap => {
            const newMap = produce(prevMap, draft => {
                draft.forEach(item => {
                    item.visible = true
                })
            })

            const base = DATABASECONFIG[microbe][dataType]['columns']
            const visibleColumns = newMap
                .filter(col => col.visible)
                .map(col => base.find(item => item.dataIndex === col.value))
                .filter(Boolean)
            const operation = base.find(item => item.key === 'operation')
            setColumns(operation ? [...visibleColumns, operation] : visibleColumns)

            return newMap
        });
    }, [dataType, microbe])

    useEffect(() => {
        rebuildColumns()
    }, [rebuildColumns])

    useEffect(fetchData, [
        microbe,
        dataType,
        selectedFilterOptions,
        searchText,
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField
    ])

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
                setSearchText={setSearchText}
                selectedFilterOptions={selectedFilterOptions}
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

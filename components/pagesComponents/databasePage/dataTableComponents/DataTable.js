import { StyledTable } from "@/components/styledComponents/styledAntdTable"
import { Table } from "antd"
import { DATABASECONFIG } from "@/components/pagesComponents/databasePage/DatabaseContent"

const DataTable = ({
    columns,
    selectedRowInfo,
    setSelectedRowInfo,
    tableParams,
    setTableParams,
    tableData,
    setTableData,
    loading
}) => {
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

    const handleTableChange = (pagination, _, sorter) => {
        setTableParams({
            pagination,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : buildSortField(sorter.field),
        })

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setTableData([])
        }
    }

    return (
        <StyledTable
            columns={columns}
            rowSelection={rowSelection}
            rowKey={(record) => record['id']}
            dataSource={tableData}
            pagination={tableParams.pagination}
            loading={loading}
            scroll={{ x: 'max-content' }}
            onChange={handleTableChange}
        />
    )
}

const buildSortField = (field) => {
    if (Array.isArray(field)) {
        return field.join('__')
    } else {
        return field
    }
}

export default DataTable

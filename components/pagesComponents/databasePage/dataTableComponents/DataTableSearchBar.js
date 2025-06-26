import { memo, useCallback, useEffect, useState } from "react"
import { produce } from "immer"
import { Stack } from "@mui/system"
import { H6, Hr, Span } from "@/components/styledComponents/styledHTMLTags"
import { Button, Flex, Input, Popover, Select, Space, Statistic, Switch, Tooltip, Typography } from "antd"
import { EyeOutlined, HolderOutlined, MenuOutlined, ReloadOutlined } from "@ant-design/icons"
import { useDrag, useDrop } from "react-dnd"
import { useDatabaseContext } from "@/components/context/DatabaseContext"
import { DATABASECONFIG } from "@/components/pagesComponents/databasePage/DatabaseContent"
import { useDatabaseDetailModalContext } from "@/components/context/DatabaseDetailModalContext"

const DataTableSearchBar = ({
    dataCount,
    columnVisibilityMap,
    setColumnVisibilityMap,
    refreshColumns,
    showAllColumns,
    setColumns,
    searchContent,
    handleSearContentChange
}) => {
    const { dataTableState, dataType } = useDatabaseContext()
    const { microbe, magStatus } = dataTableState
    const [localSearchText, setLocalSearchText] = useState({
        field: fieldMap[microbe],
        value: ''
    })

    const handleSearchTextChange = (changed) => {
        setLocalSearchText(prev => ({
            ...prev,
            ...changed
        }))
    }

    const onSearch = () => {
        handleSearContentChange(localSearchText.value)
    }

    const onClear = () => {
        handleSearContentChange('')
    }

    useEffect(() => {
        setLocalSearchText({
            field: fieldMap[microbe],
            value: searchContent.value
        })
    }, [microbe, searchContent.value])

    return (
        <Stack direction="row" spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ fontSize: '20px' }}>
                <Span>TOTAL OF </Span>
                <Statistic value={dataCount} valueStyle={{ fontSize: '20px', fontWeight: 700 }}/>
                <Span> {dataType.toUpperCase()}</Span>
            </Stack>
            <Stack direction="row" spacing={1}>
                <Space.Compact>
                    <Select
                        value={localSearchText.field}
                        options={DATABASECONFIG[microbe][magStatus][dataType]['searchBarFields']}
                        style={{ width: 120 }}
                        onChange={(val) => handleSearchTextChange({ field: val })}
                    />
                    <Input.Search
                        placeholder="Search..."
                        allowClear
                        value={localSearchText.value}
                        onChange={(e) => handleSearchTextChange({value: e.target.value})}
                        onSearch={(value) => onSearch({ value })}
                        onClear={onClear}
                        style={{
                            width: 250,
                        }}
                    />
                </Space.Compact>
                <Popover
                    placement="bottomRight"
                    content={
                        <TableSearchFieldSwitchList
                            columnVisibilityMap={columnVisibilityMap}
                            setColumnVisibilityMap={setColumnVisibilityMap}
                            refreshColumns={refreshColumns}
                            showAllColumns={showAllColumns}
                            setColumns={setColumns}
                        />
                    }
                    trigger={['click']}
                    styles={{
                        body: {
                            backgroundColor: '#FFFFFF',
                            borderRadius: '8px',
                            boxShadow: 'rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px',
                            padding: '8px'
                        }
                    }}
                >
                    <Button icon={<MenuOutlined/>} style={{ color: '#276D8C', borderColor: '#276D8C' }}/>
                </Popover>
            </Stack>
        </Stack>
    )
}

const TableSearchFieldSwitchList = ({
    columnVisibilityMap,
    setColumnVisibilityMap,
    refreshColumns,
    showAllColumns,
    setColumns
}) => {
    return (
        <Flex
            vertical
            gap={1}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
            >
                <H6 sx={{
                    fontWeight: 500,
                    fontSize: '16px',
                    marginTop: '0px',
                    marginBottom: '8px'
                }}>
                    Columns Settings
                </H6>
                <Stack direction='row'>
                    <Tooltip title='Show All Columns' placement='topRight'>
                        <Button icon={<EyeOutlined/>} type='text' onClick={showAllColumns}/>
                    </Tooltip>
                    <Tooltip title='Reset Columns' placement='topRight'>
                        <Button icon={<ReloadOutlined/>} type='text' onClick={refreshColumns}/>
                    </Tooltip>
                </Stack>
            </Stack>
            <Hr/>
            <SwitchContainer
                columnVisibilityMap={columnVisibilityMap}
                setColumnVisibilityMap={setColumnVisibilityMap}
                setColumns={setColumns}
            />
        </Flex>
    )
}

const SwitchContainer = ({ columnVisibilityMap, setColumnVisibilityMap, setColumns }) => {
    const { handleDetailClick } = useDatabaseDetailModalContext()
    const { dataTableState, dataType } = useDatabaseContext()
    const { microbe, magStatus } = dataTableState

    const handleSwitchChange = useCallback((value) => {
        setColumnVisibilityMap(prevMap => {
            const newMap = produce(prevMap, draft => {
                const field = draft.find(field => field.value === value)
                if (field) field.visible = !field.visible
            })

            const base = DATABASECONFIG[microbe][magStatus][dataType]['columns'](
                handleDetailClick,
                DATABASECONFIG[microbe][magStatus][dataType]['endpointSingleDownload']
            )
            const visibleColumns = newMap
                .filter(col => col.visible)
                .map(col => base.find(item => item.dataIndex === col.value))
                .filter(Boolean)
            const operationCol = base.find(col => col.key === 'operation')

            setColumns(operationCol ? [...visibleColumns, operationCol] : visibleColumns)

            return newMap
        })
    }, [dataType, handleDetailClick, magStatus, microbe, setColumnVisibilityMap, setColumns])

    const findCard = useCallback(
        (id) => {
            const card = columnVisibilityMap.filter((c) => `${c.value}` === id)[0]
            return {
                card,
                index: columnVisibilityMap.indexOf(card),
            }
        },
        [columnVisibilityMap],
    )

    const moveCard = useCallback(
        (id, atIndex) => {
            const { card, index } = findCard(id)

            setColumnVisibilityMap(
                produce(columnVisibilityMap, (draft) => {
                    draft.splice(index, 1)
                    draft.splice(atIndex, 0, card)
                })
            )
        },
        [columnVisibilityMap, findCard, setColumnVisibilityMap]
    )

    const onDragEnd = useCallback(() => {
        const base = DATABASECONFIG[microbe][magStatus][dataType]['columns'](
            handleDetailClick,
            DATABASECONFIG[microbe][magStatus][dataType]['endpointSingleDownload']
        )
        const visibleColumns = columnVisibilityMap
            .filter(col => col.visible)
            .map(col => base.find(item => item.dataIndex === col.value))
            .filter(Boolean)

        const operation = base.find(item => item.key === 'operation')
        setColumns(operation ? [...visibleColumns, operation] : visibleColumns)
    }, [microbe, magStatus, dataType, handleDetailClick, columnVisibilityMap, setColumns])

    const [, drop] = useDrop(() => ({ accept: 'card' }))

    return (

        <Stack
            ref={drop}
            spacing={1}
            sx={{ mt: '8px' }}
        >
            {columnVisibilityMap.map((card) => (
                <SwitchCard
                    key={card.value}
                    field={card}
                    moveCard={moveCard}
                    findCard={findCard}
                    handleSwitchChange={handleSwitchChange}
                    onDragEnd={onDragEnd}
                />
            ))}
        </Stack>
    )
}

const SwitchCard = memo(
    function SwitchCard({ field, moveCard, findCard, handleSwitchChange, onDragEnd }) {
        const id = field.value
        const originalIndex = findCard(id).index
        const [{ isDragging }, drag] = useDrag(
            () => ({
                type: 'card',
                item: { id, originalIndex },
                collect: (monitor) => ({
                    isDragging: monitor.isDragging(),
                }),
                end: (item, monitor) => {
                    const { id: droppedId, originalIndex } = item
                    const didDrop = monitor.didDrop()
                    if (!didDrop) {
                        moveCard(droppedId, originalIndex)
                    } else {
                        onDragEnd()
                    }
                },
            }),
            [field, originalIndex, moveCard],
        )
        const [, drop] = useDrop(
            () => ({
                accept: 'card',
                hover({ id: draggedId }) {
                    if (draggedId !== id) {
                        const { index: overIndex } = findCard(id)
                        moveCard(draggedId, overIndex)
                    }
                },
            }),
            [findCard, moveCard],
        )
        const opacity = isDragging ? 0 : 1

        return (
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                spacing={2}
                sx={{
                    backgroundColor: '#f0f0f0',
                    pl: '4px',
                    pr: '2px',
                    py: '2px',
                    borderRadius: '4px',
                    cursor: 'move',
                    opacity: opacity
                }}
                ref={(node) => drag(drop(node))}
            >
                <Stack direction='row' spacing={1}>
                    <HolderOutlined/>
                    <Typography.Text
                        style={{ width: '175px' }}
                        ellipsis={true}
                    >
                        {field.text}
                    </Typography.Text>
                </Stack>
                <Switch
                    size="small"
                    checked={field.visible}
                    onChange={() => handleSwitchChange(field.value)}
                />
            </Stack>
        )
    }
)

export const fieldMap = {
    archaea: 'archaea_id',
    bacteria: 'bacteria_id',
    fungi: 'fungi_id',
    viruses: 'viruses_id',
}

export default DataTableSearchBar

import { Button, Checkbox, Collapse, ConfigProvider } from "antd"
import { Stack } from "@mui/system"
import { useState } from "react"
import { DoubleLeftOutlined } from "@ant-design/icons"
import FilterCancel from "@/components/icons/FilterCancel"
import { DATABASECONFIG, initSelected } from "@/components/pagesComponents/databasePage/DatabaseContent"

const FilterCollapse = ({ microbe, dataType, filterOptions, selectedFilterOptions, setSelectedFilterOptions }) => {
    const [activeKey, setActiveKey] = useState([Object.keys(filterOptions)[0]])

    const items = DATABASECONFIG[microbe][dataType]['filterItems'](
        filterOptions,
        selectedFilterOptions,
        setSelectedFilterOptions
    )

    console.log(filterOptions)

    const handleCollapseChange = (props) => {
        setActiveKey(props)
    }

    return (
        <Stack spacing={2}>
            <FilterOptions
                setActiveKey={setActiveKey}
                setSelectedFilterOptions={setSelectedFilterOptions}
                filterOptions={filterOptions}
            />
            <ConfigProvider
                theme={{
                    components: {
                        Collapse: {
                            headerBg: '#FFFFFF'
                        }
                    }
                }}
            >
                <Collapse
                    items={items}
                    activeKey={activeKey}
                    onChange={handleCollapseChange}
                />
            </ConfigProvider>
        </Stack>
    )
}

export const FilterCheckBox = ({ name, options, selected, setSelected, formatFn=undefined }) => {
    const handelChange = (checkedValue) => {
        setSelected(prev => ({
            ...prev,
            [name]: checkedValue
        }))
    }

    return (
        <Checkbox.Group name={name} onChange={handelChange} value={selected[name]}>
            <Stack>
                {
                    options.map(
                        (option, index) =>
                            <Checkbox
                                value={option}
                                key={index}
                            >
                                { formatFn ? formatFn(option) : option}
                            </Checkbox>
                    )
                }
            </Stack>
        </Checkbox.Group>
    )
}

const FilterOptions = ({ setActiveKey, setSelectedFilterOptions, filterOptions }) => {
    const handleCollapseAll = () => {
        setActiveKey([])
    }

    const handleFilterClear = () => {
        setSelectedFilterOptions(initSelected(filterOptions))
    }

    return (
        <Stack direction="row" spacing={2}>
            <Button icon={<DoubleLeftOutlined rotate={90}/>} onClick={handleCollapseAll}>Collapse All</Button>
            <Button icon={<FilterCancel/>} onClick={handleFilterClear}>Clear Filters</Button>
        </Stack>
    )
}

export default FilterCollapse

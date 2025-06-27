import { Button, Checkbox, Radio, Collapse, ConfigProvider, Tooltip, Typography } from "antd"
import { Stack } from "@mui/system"
import { useState } from "react"
import { DoubleLeftOutlined } from "@ant-design/icons"
import FilterCancel from "@/components/icons/FilterCancel"
import {
    annotationToMicrobeMap,
    DATABASECONFIG,
    initSelected
} from "@/components/pagesComponents/databasePage/DatabaseContent"
import { useDatabaseContext } from "@/components/context/DatabaseContext"

const FilterCollapse = ({ filterOptions, selectedFilterOptions, setSelectedFilterOptions }) => {
    const { dataTableState, dataType } = useDatabaseContext()
    const { microbe, magStatus } = dataTableState
    const [activeKey, setActiveKey] = useState(['microbe', 'magStatus'])

    const items = [
        {
            key: 'microbe',
            label: 'Microbe',
            children: <MicrobeRadio/>
        },
        {
            key: 'magStatus',
            label: 'Assembly Type',
            children: <MAGStatusRadio/>
        },
        ...DATABASECONFIG[microbe][magStatus][dataType]['filterItems'](
            filterOptions,
            selectedFilterOptions,
            setSelectedFilterOptions
        )]

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

const DefaultOptionWrapper = ({ option }) => (
    <Tooltip title={option}>
        <Typography.Text
            ellipsis={true}
            style={{
                maxWidth: '200px'
            }}
        >
            {option}
        </Typography.Text>
    </Tooltip>
)

const MicrobeRadio = ({}) => {
    const { dataTableState, dataType, updateMicrobe } = useDatabaseContext()
    const { microbe } = dataTableState

    const handleChange = (e) => {
        updateMicrobe(e.target.value)
    }

    return (
        <Radio.Group name='microbe' onChange={handleChange} value={microbe}>
            <Stack>
                {
                    annotationToMicrobeMap[dataType].map((option, index) => (
                        <Radio value={option} key={index}>
                            <Typography.Text
                                ellipsis={true}
                                style={{
                                    maxWidth: '200px'
                                }}
                            >
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </Typography.Text>
                        </Radio>
                    ))
                }
            </Stack>
        </Radio.Group>
    )
}

const MAGStatusRadio = ({}) => {
    const {dataTableState, updateMagStatus} = useDatabaseContext()
    const {magStatus} = dataTableState

    const handleChange = (e) => {
        updateMagStatus(e.target.value)
    }

    return (
        <Radio.Group name='magStatus' onChange={handleChange} value={magStatus}>
            <Stack>
                {
                    [{ label: 'Monoisolate', value: 'unMAG' }, { label: 'MAG', value: 'MAG' }].map((option, index) => (
                        <Radio value={option.value} key={index}>
                            <Typography.Text
                                ellipsis={true}
                                style={{
                                    maxWidth: '200px'
                                }}
                            >
                                {option.label}
                            </Typography.Text>
                        </Radio>
                    ))
                }
            </Stack>
        </Radio.Group>
    )
}

export const FilterCheckBox = ({
    name,
    options,
    selected,
    setSelected,
    OptionWrapper = DefaultOptionWrapper,
    formatFn = undefined
}) => {
    const handelChange = (checkedValue) => {
        setSelected(prev => ({
            ...prev,
            [name]: checkedValue
        }))
    }

    console.log(options)
    console.log(selected)

    return (
        <Checkbox.Group name={name} onChange={handelChange} value={selected[name]}>
            <Stack
                sx={{
                    width: '250px',
                    maxHeight: '200px',
                    overflowX: 'auto'
                }}
            >
                {
                    options.map(
                        (option, index) =>
                            <Checkbox
                                value={option}
                                key={index}
                            >
                                <OptionWrapper option={formatFn ? formatFn(option) : option}/>
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

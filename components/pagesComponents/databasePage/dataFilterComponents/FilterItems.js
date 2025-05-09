import { FilterCheckBox } from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterCollapse"

export const getArchaeaFilterItems = (filterOptions, selected, setSelected) => [
    {
        key: 'assembly_level',
        label: 'Assembly Level',
        children: <FilterCheckBox
            name='assembly_level'
            options={filterOptions['assembly_level']}
            selected={selected}
            setSelected={setSelected}
        />
    }
]

const strandFormatFn = (strand) => {
    return strand === 0 ? '+' : '-'
}

export const getArchaeaProteinsFilterItems = (filterOptions, selected, setSelected) => [
    {
        key: 'strand',
        label: 'Strand',
        children: <FilterCheckBox
            name='strand'
            options={filterOptions['strand']}
            selected={selected}
            setSelected={setSelected}
            formatFn={strandFormatFn}
        />
    },
    {
        key: 'cog_category',
        label: 'COG Category',
        children: <FilterCheckBox
            name='cog_category'
            options={filterOptions['cog_category']}
            selected={selected}
            setSelected={setSelected}
        />
    }
]

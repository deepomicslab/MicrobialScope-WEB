import { Tooltip, Typography } from "antd"
import { FilterCheckBox } from "@/components/pagesComponents/databasePage/dataFilterComponents/FilterCollapse"
import { COGCategoryDict } from "@/components/pagesComponents/databasePage/dataTableComponents/tableRenderers"

export const getArchaeaFilterItems = (filterOptions, selected, setSelected) => [
    {
        key: 'assembly_level',
        label: 'Assembly Level',
        children: <FilterCheckBox
            name='assembly_level'
            options={filterOptions['assembly_level'].filter(key => key !== 'Contig, Complete Genome')}
            selected={selected}
            setSelected={setSelected}
        />
    }
]

const strandFormatFn = (strand) => {
    return strand === 0 ? '+' : '-'
}

const COGCategoryOptionWrapper = ({ option }) => (
    <Tooltip title={`${option} - ${COGCategoryDict[option]}`}>
        <Typography.Text
            ellipsis={true}
            style={{
                width: '200px'
            }}
        >
            {`${option} - ${COGCategoryDict[option]}`}
        </Typography.Text>
    </Tooltip>
)

export const getArchaeaProteinsFilterItems = (filterOptions, selected, setSelected) => [
    // {
    //     key: 'strand',
    //     label: 'Strand',
    //     children: <FilterCheckBox
    //         name='strand'
    //         options={filterOptions['strand']}
    //         selected={selected}
    //         setSelected={setSelected}
    //         formatFn={strandFormatFn}
    //     />
    // },
    // {
    //     key: 'cog_category',
    //     label: 'COG Category',
    //     children: <FilterCheckBox
    //         name='cog_category'
    //         options={filterOptions['cog_category']}
    //         selected={selected}
    //         setSelected={setSelected}
    //         OptionWrapper={COGCategoryOptionWrapper}
    //     />
    // }
]

export const getArchaeaTRNAsFilterItems = (filterOptions, selected, setSelected) => [
    {
        key: 'trna_type',
        label: 'tRNA Type',
        children: <FilterCheckBox
            name='trna_type'
            options={filterOptions['trna_type']}
            selected={selected}
            setSelected={setSelected}
        />
    }
]

export const getArchaeaCRISPRCasSystemsFilterItems = (filterOptions, selected, setSelected) => [
    {
        key: 'crispr_subtype',
        label: 'CRISPR Subtype',
        children: <FilterCheckBox
            name='crispr_subtype'
            options={filterOptions['crispr_subtype']}
            selected={selected}
            setSelected={setSelected}
        />
    },
    {
        key: 'cas__cas_subtype',
        label: 'Cas Subtype',
        children: <FilterCheckBox
            name='cas__cas_subtype'
            options={filterOptions['cas__cas_subtype']}
            selected={selected}
            setSelected={setSelected}
        />
    }
]

export const getArchaeaAntiCRISPRAnnotationsFilterItems = (filterOptions, selected, setSelected) => [
    {
        key: 'classification',
        label: 'Classification',
        children: <FilterCheckBox
            name='classification'
            options={filterOptions['classification']}
            selected={selected}
            setSelected={setSelected}
        />
    }
]

export const getArchaeaSecondaryMetabolitesFilterItems = (filterOptions, selected, setSelected) => [
    {
        key: 'type',
        label: 'Type',
        children: <FilterCheckBox
            name='type'
            options={filterOptions['type']}
            selected={selected}
            setSelected={setSelected}
        />
    }
]

export const getArchaeaSignalPeptidesFilterItems = (filterOptions, selected, setSelected) => [
    {
        key: 'prediction',
        label: 'Prediction',
        children: <FilterCheckBox
            name='prediction'
            options={filterOptions['prediction']}
            selected={selected}
            setSelected={setSelected}
        />
    }
]

export const getArchaeaVirulenceFactorsFilterItems = (filterOptions, selected, setSelected) =>
    Object.keys(filterOptions).length !== 0 ? ([
        {
            key: 'vf_category',
            label: 'Vfcategory',
            children: <FilterCheckBox
                name='vf_category'
                options={filterOptions['vf_category']}
                selected={selected}
                setSelected={setSelected}
            />
        }
    ]) : (
        []
    )

export const getArchaeaAntibioticResistancesFilterItems = (filterOptions, selected, setSelected) => [
    {
        key: 'cutoff',
        label: 'Cut Off',
        children: <FilterCheckBox
            name='cutoff'
            options={filterOptions['cutoff']}
            selected={selected}
            setSelected={setSelected}
        />
    },
    // {
    //     key: 'drug_class',
    //     label: 'Drug Class',
    //     children: <FilterCheckBox
    //         name='drug_class'
    //         options={filterOptions['drug_class']}
    //         selected={selected}
    //         setSelected={setSelected}
    //     />
    // }
]

export const getVirusesAntibioticResistancesFilterItems = (filterOptions, selected, setSelected) => []

export const getArchaeaTransmembraneHelicesFilterItems = (filterOptions, selected, setSelected) => [
    // {
    //     key: 'predicted_tmh_count',
    //     label: 'Number of predicted TMHs',
    //     children: <FilterCheckBox
    //         name='predicted_tmh_count'
    //         options={filterOptions['predicted_tmh_count']}
    //         selected={selected}
    //         setSelected={setSelected}
    //     />
    // }
]

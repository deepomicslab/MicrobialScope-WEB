import { SearchOutlined } from "@ant-design/icons"
import { Button, Input, Select, Space } from "antd"
import { Box } from "@mui/system"
import { Span } from "@/components/styledComponents/styledHTMLTags"

const HomeSearchBar = ({
    value = {},
    onChange,
    onSearch,
    microbeOptions,
    magOptions,
    searchFieldOptions,
    size = 'middle',
}) => {
    const { microbeField = 'archaea', magField = 'unMAG', searchField = 'microbial_id', keyword = '' } = value

    const searchTip = searchField === 'microbial_id' ? 'eg. GCA_000025685.1, GCF_000006805.1, GCF_000025685.1, GCF_004799605.1' : 'eg. Haloferax volcanii, Sulfolobus acidocaldarius, Pyrococcus furiosus, Methanosarcina mazei'
    const placeholder = searchField === 'microbial_id' ? 'Enter Microbial ID' : 'Enter Species'

    const triggerChange = (changed) => {
        if (onChange) {
            onChange({ ...value, ...changed })
        }
    }

    const handleSearch = () => {
        onSearch?.({ microbeField, magField, keyword, searchField })
    }

    return (
        <Space.Compact style={{ width: '100%' }}>
            <Select
                value={microbeField}
                options={microbeOptions}
                style={{ width: 200 }}
                onChange={(val) => triggerChange({ microbeField: val })}
                size={size}
            />
            <Select
                value={magField}
                options={magOptions}
                style={{ width: 200 }}
                onChange={(val) => triggerChange({ magField: val })}
                size={size}
            />
            <Select
                value={searchField}
                options={searchFieldOptions}
                style={{ width: 200 }}
                onChange={(val) => triggerChange({ searchField: val })}
                size={size}
            />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 0.5,
                    width: '100%'
                }}
            >
                <Input
                    placeholder={placeholder}
                    value={keyword}
                    onChange={(e) => triggerChange({ keyword: e.target.value })}
                    onPressEnter={handleSearch}
                    size={size}
                />
                {
                    searchTip !== '' && (
                        <Span>
                            {searchTip}
                        </Span>
                    )
                }
            </Box>
            <Button type="primary" icon={<SearchOutlined/>} onClick={handleSearch} size={size}>
                Search
            </Button>
        </Space.Compact>
    )
}

export default HomeSearchBar

import axios from "axios"

export const fetcher = async url => {
    const res = await axios.get(url, {timeout: 60000});
    return res.data;
}

const apiPrefix = process.env.NEXT_PUBLIC_API_URL

// Microbe URLs
export const getMicrobeStatisticsURL = `${apiPrefix}/microbe/microbe_statistics`

// Archaea URLs
export const getArchaeaGenomesFilterOptionsURL = `${apiPrefix}/archaea/genomes_filter_options`
export const getArchaeaProteinsFilterOptionsURL = `${apiPrefix}/archaea/proteins_filter_options`

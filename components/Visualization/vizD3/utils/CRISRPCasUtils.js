export const extractCRISPRCasInfo = (crisprList) => {
    const casMap = new Map();

    const crisprInfoList = [];

    crisprList.forEach(crispr => {
        if (!casMap.has(crispr.cas.cas_id)) {
            casMap.set(crispr.cas.cas_id, {
                id: crispr.cas.cas_id,
                name: crispr.cas.cas_id,
                start: crispr.cas.cas_start,
                end: crispr.cas.cas_end,
                subtype: crispr.cas.cas_subtype,
            })
        }

        crisprInfoList.push({
            id: `${crispr.cas.cas_id}-${crispr.crispr_id}`,
            name: crispr.crispr_id,
            start: crispr.crispr_start,
            end: crispr.crispr_end,
            subtype: crispr.crispr_subtype,
        })
    })

    return {
        cas_info_list: Array.from(casMap.values()),
        crispr_info_list: crisprInfoList
    }
}

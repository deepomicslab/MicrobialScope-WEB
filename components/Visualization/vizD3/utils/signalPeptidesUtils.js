export const extractSPArrowData = (spList) => {
    return spList.map(
        sp => ({
            id: sp.id,
            name: sp.protein_id,
            start: sp.start,
            end: sp.end,
            strand: sp.strand,
            type: sp.prediction,
            color: '#FF6347'
        })
    )
}

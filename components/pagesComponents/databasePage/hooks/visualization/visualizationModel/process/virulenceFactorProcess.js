export const addStartAndEndToVF = (spList, proteinList) => {
    const proteinMap = new Map()
    proteinList.forEach(protein => {
        proteinMap.set(protein.protein_id, { start: protein.start, end: protein.end, strand: protein.strand })
    })

    return spList.map(sp => {
        const proteinData = proteinMap.get(sp.protein_id)
        if (proteinData) {
            return { ...sp, start: proteinData.start, end: proteinData.end, strand: proteinData.strand }
        }
        return sp
    })
}

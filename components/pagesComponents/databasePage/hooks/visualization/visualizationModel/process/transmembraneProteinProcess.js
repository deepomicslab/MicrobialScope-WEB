export const flattenHelicesWithGenomePosition = (transmembraneHelices, proteinList) => {
    const proteinMap = new Map()
    proteinList.forEach(protein => {
        proteinMap.set(protein.protein_id, {
            start: protein.start,
            end: protein.end,
            strand: protein.strand
        })
    })

    const flattened = []

    transmembraneHelices.forEach(tmh => {
        const proteinInfo = proteinMap.get(tmh.protein_id)

        if (tmh.helices && Array.isArray(tmh.helices) && proteinInfo) {
            const { start: pStart, end: pEnd, strand } = proteinInfo

            tmh.helices.forEach(helix => {
                let genomeStart, genomeEnd

                if (strand === 0) {
                    genomeStart = pStart + helix.start - 1
                    genomeEnd = pStart + helix.end - 1
                } else {
                    genomeStart = pEnd - helix.end + 1
                    genomeEnd = pEnd - helix.start + 1
                }

                flattened.push({
                    ...helix,
                    protein_id: tmh.protein_id,
                    strand,
                    source: tmh.source,
                    predicted_tmh_count: tmh.predicted_tmh_count,
                    protein_start: helix.start,
                    protein_end: helix.end,
                    start: genomeStart,
                    end: genomeEnd
                })
            })
        }
    })

    return flattened
}

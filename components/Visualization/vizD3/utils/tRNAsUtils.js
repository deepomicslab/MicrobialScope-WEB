export const extractTRNAArrowData = (trnas) => {
    return trnas.map(
        t => ({
            id: t.id,
            name: t['trna_id'],
            start: t.start,
            end: t.end,
            strand: t.strand,
            type: t['trna_type'],
            color: '#FFD700'
        })
    )
}

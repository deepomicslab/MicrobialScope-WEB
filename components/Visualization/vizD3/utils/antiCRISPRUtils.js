export const extractAntiCRISPRArrowData = (antiCRISPRs) => {
    return antiCRISPRs.map(
        ac => ({
            id: ac.id,
            name: ac['protein_id'],
            start: ac.start,
            end: ac.end,
            strand: ac.strand,
            type: ac['classification'],
            color: '#FF6347'
        })
    )
}

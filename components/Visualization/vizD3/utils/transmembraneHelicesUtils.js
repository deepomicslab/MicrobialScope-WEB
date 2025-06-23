export const extractTransmembraneHelixArrowData = (helicesList) => {
    const colorMap = {
        TMhelix: '#FF6347',
        inside: '#87CEFA',
        outside: '#90EE90'
    }

    return helicesList.map(helix => ({
        id: helix.id,
        name: helix.protein_id,
        start: helix.start,
        end: helix.end,
        proteinStart: helix.protein_start,
        proteinEnd: helix.protein_end,
        strand: helix.strand,
        type: helix.position,
        color: colorMap[helix.position] || '#CCCCCC'
    }))
}

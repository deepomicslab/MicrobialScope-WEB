export const extractMetaboliteArrowData = (metabolites) => {
    return metabolites.map(
        m => ({
            id: m.id,
            name: m['region'],
            start: m.start,
            end: m.end,
            type: m['type'].join(', '),
            color: '#FF6347'
        })
    )
}

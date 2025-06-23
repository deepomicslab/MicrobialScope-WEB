export const extractVirulenceFactorData = (virulenceFactor) => {
    return virulenceFactor.map(
        ar => ({
            id: ar.id,
            name: ar.protein_id,
            start: ar.start,
            end: ar.end,
            strand: ar.strand,
            type: ar['vf_category'],
            color: '#FF6347'
        })
    );
}

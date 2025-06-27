import { getCOGColor } from "@/components/Visualization/vizD3/utils/proteinsUtils"

export const extractProteinsProductLabelData = (
    proteins
) => {
    return proteins.map(
        p => ({
            id: p.id,
            name: p['protein_id'],
            start: p.start,
            end: p.end,
            product: p['product'],
            color: getCOGColor(p),
        })
    )
}

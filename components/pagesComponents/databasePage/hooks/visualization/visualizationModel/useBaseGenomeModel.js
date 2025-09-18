import { useMemo, useState } from "react"
import { analyzeGCSkew } from "@/components/Visualization/vizD3/utils/gcContentUtils"

const useBaseGenomeModel = (fastaDetail, proteins, width, entities, entityProcess) => {
    const svgWidth = Math.max(width, 1280)
    const domainEnd = Math.min(fastaDetail.length, 500_000)
    const [domain, setDomain] = useState([0, domainEnd])

    const config = useMemo(() => ({
        areaPlotWindowSize: 5000,
        gcSkewWindowSize: fastaDetail?.length > 200000 ? 500 : 20
    }), [fastaDetail?.length])

    const gcResult = useMemo(() => {
        return analyzeGCSkew(fastaDetail.sequence, config.gcSkewWindowSize)
    }, [fastaDetail.sequence, config.gcSkewWindowSize])

    const COGCategories = useMemo(() => {
        const unique = new Set();
        proteins.forEach(p => { [...p.cog_category].forEach(c => unique.add(c)); });
        return Array.from(unique).sort();
    }, [proteins])

    const entitiesProcessed = useMemo(() => {
        if (!entities) return entities

        if (typeof entityProcess !== 'function') return entities

        try {
            return entityProcess(entities, proteins)
        } catch (e) {
            return entities
        }
    }, [entities, entityProcess, proteins])

    const contigName = fastaDetail['contig']
    const contigLength = fastaDetail.length

    return {
        svgWidth,
        domain,
        domainEnd,
        setDomain,
        config,
        gcResult,
        COGCategories,
        contigLength,
        contigName,
        proteins,
        entities: entitiesProcessed
    }
}

export default useBaseGenomeModel

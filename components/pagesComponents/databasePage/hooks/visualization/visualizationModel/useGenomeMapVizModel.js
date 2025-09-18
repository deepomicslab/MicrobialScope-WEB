import useBaseGenomeModel
    from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/useBaseGenomeModel"
import {
    KIND_REGISTRY
} from "@/components/pagesComponents/databasePage/hooks/visualization/visualizationModel/kindRegistry"
import { useMemo } from "react"

const useGenomeMapVizModel = (
    kind,
    mode='circular',
    fastaDetail,
    proteins,
    width,
    entities
) => {
    const def = KIND_REGISTRY[kind]

    const baseModel = useBaseGenomeModel(fastaDetail, proteins, width, entities, def?.process)

    const layout = useMemo(() => {
        const layoutFn = mode === 'circular' ? def.layouts.circular : def.layouts.linear
        return layoutFn(baseModel)
    }, [baseModel, def.layouts.circular, def.layouts.linear, mode])

    return {
        ...baseModel,
        layout
    }
}

export default useGenomeMapVizModel

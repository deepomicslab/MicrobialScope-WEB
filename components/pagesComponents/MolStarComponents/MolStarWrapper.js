import { useEffect, useRef } from "react"
import { createPluginUI } from "molstar/lib/mol-plugin-ui"
import { renderReact18 } from "molstar/lib/mol-plugin-ui/react18"
import 'molstar/lib/mol-plugin-ui/skin/light.scss'
import { getProteinCIFURL } from "@/dataFetch/get"

const MolStarWrapper = ({ proteinId, sequence }) => {
    const parent = useRef(null)

    useEffect(() => {
        let plugin

        async function init() {
            plugin = await createPluginUI({
                target: parent.current,
                render: renderReact18,
                layoutIsExpanded: false,
            })

            window.molstar = plugin

            const data = await plugin.builders.data.download(
                { url: `${getProteinCIFURL}?proteinId=${proteinId}&sequence=${sequence}` },
                { state: { isGhost: true } }
            )

            const trajectory = await plugin.builders.structure.parseTrajectory(data, 'mmcif')

            await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default')
        }

        init()

        return () => {
            plugin?.dispose?.()
            window.molstar = undefined
        }
    }, [proteinId, sequence])

    return <div ref={parent} style={{ width: 640, height: 800 }} />
}

export default MolStarWrapper

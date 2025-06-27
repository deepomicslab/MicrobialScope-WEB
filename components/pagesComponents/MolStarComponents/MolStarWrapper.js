import { useEffect, useRef, useState } from "react"
import { createPluginUI } from "molstar/lib/mol-plugin-ui"
import { renderReact18 } from "molstar/lib/mol-plugin-ui/react18"
import 'molstar/lib/mol-plugin-ui/skin/light.scss'
import { getProteinCIFURL } from "@/dataFetch/get"
import { Spin } from "antd"

const MolStarWrapper = ({ proteinId, sequence }) => {
    const [isLoading, setIsLoading] = useState(false)
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

            setIsLoading(true)
            const data = await plugin.builders.data.download(
                { url: `${getProteinCIFURL}?proteinId=${proteinId}&sequence=${sequence}` },
                { state: { isGhost: true } }
            )

            const trajectory = await plugin.builders.structure.parseTrajectory(data, 'mmcif')

            await plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default')
            setIsLoading(false)
        }

        init()

        return () => {
            plugin?.dispose?.()
            window.molstar = undefined
        }
    }, [proteinId, sequence])

    return (
        <Spin spinning={isLoading} tip="Loading structure...">
            <div ref={parent} style={{ width: '640px', height: '600px' }}/>
        </Spin>
    )
}

export default MolStarWrapper

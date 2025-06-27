'use client'
import { useEffect, useRef } from 'react'

export default function MolstarViewer({ proteinId, sequence }) {
    const ref = useRef(null)

    useEffect(() => {
        if (!ref.current) return

        // 清空容器并插入 molstar 元素
        ref.current.innerHTML = ''

        const viewer = document.createElement('pdbe-molstar')
        viewer.setAttribute('custom-data-url', `/api/database/download_protein_cif/?protein_id=${proteinId}&sequence=${sequence}`)
        viewer.setAttribute('custom-data-format', 'cif')
        viewer.setAttribute('alphafold-view', 'true')
        viewer.setAttribute('bg-color-r', '255')
        viewer.setAttribute('bg-color-g', '255')
        viewer.setAttribute('bg-color-b', '255')
        viewer.setAttribute('hide-selection-icon', 'true')
        viewer.setAttribute('hide-animation-icon', 'true')
        viewer.style.width = '100%'
        viewer.style.height = '500px'

        ref.current.appendChild(viewer)
    }, [proteinId, sequence])

    return <div ref={ref}></div>
}

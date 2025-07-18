import { useEffect, useRef, useState } from 'react'
import Head from "next/head"
import Script from "next/script"
import { getProteinCIFURL } from "@/dataFetch/get"

// export default function MolstarViewer({ proteinId, sequence }) {
//     const ref = useRef(null)
//
//     useEffect(() => {
//         if (!ref.current) return
//
//         // 清空容器并插入 molstar 元素
//         ref.current.innerHTML = ''
//
//         const viewer = document.createElement('pdbe-molstar')
//         viewer.setAttribute('custom-data-url', `/api/database/download_protein_cif/?protein_id=${proteinId}&sequence=${sequence}`)
//         viewer.setAttribute('custom-data-format', 'cif')
//         viewer.setAttribute('alphafold-view', 'true')
//         viewer.setAttribute('bg-color-r', '255')
//         viewer.setAttribute('bg-color-g', '255')
//         viewer.setAttribute('bg-color-b', '255')
//         viewer.setAttribute('hide-selection-icon', 'true')
//         viewer.setAttribute('hide-animation-icon', 'true')
//         viewer.style.width = '100%'
//         viewer.style.height = '500px'
//
//         ref.current.appendChild(viewer)
//     }, [proteinId, sequence])
//
//     return <div ref={ref}></div>
// }

const MolstarViewer = ({ proteinId, sequence, options = {} }) => {
    const viewerRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const initializeViewer = async () => {
        if (!viewerRef.current) return

        if (!isLoading) setIsLoading(true)
        setError(null);

        try {
            viewerRef.current.innerHTML = ''

            const viewerInstance = new window.PDBeMolstarPlugin()

            // 构建自定义数据 URL
            const customDataUrl = `${getProteinCIFURL}?proteinId=${proteinId}&sequence=${encodeURIComponent(sequence)}`;

            const defaultOptions = {
                customData: {
                    url: customDataUrl,
                    format: 'mmcif',
                    binary: false
                },

                bgColor: 'white',
                alphafoldView: true,
                hideCanvasControls: ['selection', 'animation'],
                visualStyle: 'cartoon',

                ...options
            };

            await viewerInstance.render(viewerRef.current, defaultOptions);
        } catch (err) {
            setError('Failed to load protein structure')
            console.error('Error loading custom data:', err)
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!window.PDBeMolstarPlugin) return

        initializeViewer()
    }, [proteinId, sequence])

    if (error) {
        return (
            <div style={{
                width: '100%',
                height: '600px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                color: 'red'
            }}>
                {error}
            </div>
        );
    }

    return (
        <>
            { isLoading && (
                <div style={{
                    width: '100%',
                    height: '600px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <div>Loading protein structure...</div>
                        {proteinId && (
                            <div style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
                                Protein ID: {proteinId}
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div
                ref={viewerRef}
                style={{
                    width: '100%',
                    height: '600px',
                    display: !isLoading ? 'block' : 'none',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                }}
            />
        </>
    );
};

export default MolstarViewer

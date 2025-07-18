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
    const [isScriptReady, setIsScriptReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const initializeViewer = async () => {
        if (window.PDBeMolstarPlugin && viewerRef.current) {
            setIsLoading(true);
            setError(null);

            try {
                const viewerInstance = new window.PDBeMolstarPlugin();

                // 构建自定义数据 URL
                const customDataUrl = `${getProteinCIFURL}?proteinId=${proteinId}&sequence=${encodeURIComponent(sequence)}`;

                const defaultOptions = {
                    // 使用自定义数据源
                    customData: {
                        url: customDataUrl,
                        format: 'mmcif', // 或 'pdb'，取决于你的数据格式
                        binary: false
                    },

                    // 样式设置
                    bgColor: 'white',
                    alphafoldView: true,
                    hideCanvasControls: ['selection', 'animation'],
                    visualStyle: 'cartoon',

                    // 其他选项
                    ...options
                };

                await viewerInstance.render(viewerRef.current, defaultOptions);

                // 应用颜色方案
                setTimeout(() => {
                    applyColorScheme(viewerInstance);
                }, 2000);

                setIsLoading(false);
            } catch (err) {
                setError('Failed to load protein structure');
                setIsLoading(false);
                console.error('Error loading custom data:', err);
            }
        }
    };

    const applyColorScheme = (viewerInstance) => {
        try {
            if (viewerInstance.visual && viewerInstance.visual.update) {
                viewerInstance.visual.update({
                    polymer: {
                        type: 'cartoon',
                        color: { name: 'secondary-structure' },
                        size: { name: 'uniform' }
                    }
                });
            }
        } catch (error) {
            console.log('Color scheme not applied, using default');
        }
    };

    useEffect(() => {
        if (isScriptReady && proteinId && sequence) {
            initializeViewer();
        }
    }, [isScriptReady, proteinId, sequence]);

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
            <link
                rel="stylesheet"
                type="text/css"
                href="https://cdn.jsdelivr.net/npm/pdbe-molstar@3.3.0/build/pdbe-molstar-light.css"
            />

            <Script
                src="https://cdn.jsdelivr.net/npm/pdbe-molstar@3.3.0/build/pdbe-molstar-plugin.js"
                strategy="afterInteractive"
                onLoad={() => setIsScriptReady(true)}
                onError={(e) => console.error('Failed to load PDBe Molstar script:', e)}
            />

            {(!isScriptReady || isLoading) && (
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
                    display: (isScriptReady && !isLoading) ? 'block' : 'none',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                }}
            />
        </>
    );
};

export default MolstarViewer

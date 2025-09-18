import { useState } from "react"

const useVisualizationMode = () => {
    const [visualizationMode, setVisualizationMode] = useState('circular')

    const handleVisualizationModeChange = () => {
        setVisualizationMode(prevMode => (prevMode === 'circular' ? 'linear' : 'circular'));
    }

    return {
        visualizationMode,
        handleVisualizationModeChange
    }
}

export default useVisualizationMode

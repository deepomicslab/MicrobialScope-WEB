import { Button } from "antd"

const VisualizationModeSwitchButton = ({
    visualizationMode,
    handleVisualizationModeChange
}) => {
    const isCircular = visualizationMode === 'circular';

    return (
        <Button
            type='primary'
            onClick={handleVisualizationModeChange}
            style={{ width: '175px' }}
        >
            {isCircular ? 'Switch to Linear View' : 'Switch to Circular View'}
        </Button>
    )
}

export default VisualizationModeSwitchButton

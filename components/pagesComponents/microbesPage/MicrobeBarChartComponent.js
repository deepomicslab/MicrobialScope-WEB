import ResponsiveVisualizationContainer from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import MicrobeStatisticBarChart from "@/components/Visualization/vizEcharts/MicrobeStatisticBarChart"

const MicrobeBarChartComponent = ({ data }) => {

    return (
        <ResponsiveVisualizationContainer
            containerSx={{
                height: '500px',
                width: '100%',
                marginTop: '40px'
            }}
        >
            <MicrobeStatisticBarChart data={data}/>
        </ResponsiveVisualizationContainer>
    )
}


export default MicrobeBarChartComponent

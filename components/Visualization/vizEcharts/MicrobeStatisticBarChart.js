import { useContainerSize } from "@/components/Visualization/containers/ResponsiveVisualizationContainer"
import { useEffect, useRef } from "react"
import { Box } from "@mui/system"
import * as echarts from "echarts"

const MicrobeStatisticBarChart = ({ data }) => {
    const { width, height } = useContainerSize()

    const chartRef = useRef(null)
    const chartInstanceRef = useRef(null)

    useEffect(() => {
        if (!chartInstanceRef.current) {
            chartInstanceRef.current = echarts.init(chartRef.current);
        }

        const option = getOptions(data)
        const drillDownData = buildDrillDownData(data)

        chartInstanceRef.current.on('click', function (event) {
            console.log(event.data)
            if (event.data) {
                let subData = drillDownData.find(function (data) {
                    return data.dataGroupId === event.data.groupId
                })

                if (!subData) {
                    return
                }

                chartInstanceRef.current.clear()
                chartInstanceRef.current.setOption(
                    {
                        xAxis: {
                            data: subData.data.map(function (item) {
                                return item[0];
                            }),
                            axisTick: {
                                alignWithLabel: true,
                                interval: 0
                            },
                            axisLabel: {
                                interval: 0,
                                rotate: 15,
                                align: 'center',
                                margin: 30
                            }
                        },
                        yAxis: {
                            name: 'Count',
                            nameLocation: 'middle',
                            nameTextStyle: {
                                padding: [0, 0, 20, 0],
                                fontWeight: 'bold'
                            }
                        },
                        title: {
                            text: `${event.data.name} Statistics`,
                            left: 'center',
                            textStyle: {
                                fontSize: 24
                            }
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            }
                        },
                        series: [
                            {
                                type: 'bar',
                                dataGroupId: subData.dataGroupId,
                                data: subData.data.map(function (item) {
                                    return item[1];
                                }),
                                barMaxWidth: '50%',
                                itemStyle: {
                                    color: event.data.name.startsWith('MAG') ? '#253D56' : '#A12D44'
                                },
                                universalTransition: {
                                    enabled: true,
                                    divideShape: 'clone'
                                }
                            }
                        ],
                        graphic: [
                            {
                                type: 'text',
                                left: 50,
                                top: 20,
                                style: {
                                    text: 'Back',
                                    fontSize: 18
                                },
                                onclick: function (params) {
                                    chartInstanceRef.current.clear()
                                    chartInstanceRef.current.setOption(option)
                                }
                            }
                        ]
                    }
                )
            }
        });

        option && chartInstanceRef.current.setOption(option)

    }, [data])

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.resize();
        }
    }, [height, width])

    return (
        <Box ref={chartRef} sx={{ height: height }}></Box>
    )
}

const getOptions = (data) =>{
    return {
        xAxis: {
            data: ['Archaea', 'Bacteria', 'Fungi', 'Viruses'],
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            name: 'Genome Count',
            nameLocation: 'middle',
            nameTextStyle: {
                padding: [0, 0, 20, 0],
                fontWeight: 'bold'
            }
        },
        title: {
            text: 'Microorganism Statistics',
            left: 'center',
            textStyle: {
                fontSize: 24
            }
        },
        legend: {
            show: true,
            top: 'bottom',
            data: ['MAG', 'unMAG'],
            itemGap: 20
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        dataGroupId: '',
        animationDurationUpdate: 500,
        series: buildSeries(data)
    }
}

const buildSeries = (data) => {
    return [
        {
            type: 'bar',
            name: 'MAG',
            id: 'MAG',
            itemStyle: {
                color: '#253D56'
            },
            barMaxWidth: '20%',
            data: [
                {
                    value: data['MAGArchaeaCount'],
                    name: 'MAG Archaea',
                    groupId: 'MAGArchaea'
                },
                {
                    value: data['MAGBacteriaCount'],
                    name: 'MAG Bacteria',
                    groupId: 'MAGBacteria'
                },
                {
                    value: data['MAGFungiCount'],
                    name: 'MAG Fungi',
                    groupId: 'MAGFungi'
                },
                {
                    value: data['MAGVirusesCount'],
                    name: 'MAG Viruses',
                    groupId: 'MAGViruses'
                }
            ],
            universalTransition: {
                enabled: true,
                divideShape: 'clone'
            }
        },
        {
            type: 'bar',
            name: 'unMAG',
            id: 'unMAG',
            itemStyle: {
                color: '#A12D44'
            },
            barMaxWidth: '20%',
            barGap: '15%',
            data: [
                {
                    value: data['unMAGArchaeaCount'],
                    name: 'unMAG Archaea',
                    groupId: 'unMAGArchaea'
                },
                {
                    value: data['unMAGBacteriaCount'],
                    name: 'unMAG Bacteria',
                    groupId: 'unMAGBacteria'
                },
                {
                    value: data['unMAGFungiCount'],
                    name: 'unMAG Fungi',
                    groupId: 'unMAGFungi'
                },
                {
                    value: data['unMAGVirusesCount'],
                    name: 'unMAG Viruses',
                    groupId: 'unMAGViruses'
                }
            ],
            universalTransition: {
                enabled: true,
                divideShape: 'clone'
            }
        }
    ]
}

const buildDrillDownData = (data) => {
    return [
        {
            dataGroupId: 'MAGArchaea',
            data: [
                ['Taxonomy', data['MAGArchaeaTaxonomyCount']],
                ['Protein', data['MAGArchaeaProteinCount']],
                ['tRNA', data['MAGArchaeaTrnaCount']],
                ['CRISPR/Cas Systems', data['MAGArchaeaCRISPRCount']],
                ['Anti-CRISPR', data['MAGArchaeaAntiCRISPRAnnotationCount']],
                ['Secondary Metabolites', data['MAGArchaeaSecondaryMetaboliteRegionCount']],
                ['Signal Peptides', data['MAGArchaeaSignalPeptidePredictionCount']],
                ['Virulence Factors', data['MAGArchaeaVirulenceFactorCount']],
                ['Antibiotic Resistance Genes', data['MAGArchaeaAntibioticResistanceCount']],
                ['Transmembrane Proteins', data['MAGArchaeaTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'MAGBacteria',
            data: [
                ['Taxonomy', data['MAGBacteriaTaxonomyCount']],
                ['Protein', data['MAGBacteriaProteinCount']],
                ['tRNA', data['MAGBacteriaTrnaCount']],
                ['CRISPR/Cas Systems', data['MAGBacteriaCRISPRCount']],
                ['Anti-CRISPR', data['MAGBacteriaAntiCRISPRAnnotationCount']],
                ['Secondary Metabolites', data['MAGBacteriaSecondaryMetaboliteRegionCount']],
                ['Signal Peptides', data['MAGBacteriaSignalPeptidePredictionCount']],
                ['Virulence Factors', data['MAGBacteriaVirulenceFactorCount']],
                ['Antibiotic Resistance Genes', data['MAGBacteriaAntibioticResistanceCount']],
                ['Transmembrane Proteins', data['MAGBacteriaTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'MAGFungi',
            data: [
                ['Taxonomy', data['MAGFungiTaxonomyCount']],
                ['Protein', data['MAGFungiProteinCount']],
                ['tRNA', data['MAGFungiTrnaCount']],
                ['Secondary Metabolites', data['MAGFungiSecondaryMetaboliteRegionCount']],
                ['Signal Peptides', data['MAGFungiSignalPeptidePredictionCount']],
                ['Virulence Factors', data['MAGFungiVirulenceFactorCount']],
                ['Antibiotic Resistance Genes', data['MAGFungiAntibioticResistanceCount']],
                ['Transmembrane Proteins', data['MAGFungiTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'MAGViruses',
            data: [
                ['Taxonomy', data['MAGVirusesTaxonomyCount']],
                ['Protein', data['MAGVirusesProteinCount']],
                ['tRNA', data['MAGVirusesTrnaCount']],
                ['CRISPR/Cas Systems', data['MAGVirusesCRISPRCount']],
                ['Anti-CRISPR', data['MAGVirusesAntiCRISPRAnnotationCount']],
                ['Virulence Factors', data['MAGVirusesVirulenceFactorCount']],
                ['Antibiotic Resistance Genes', data['MAGVirusesAntibioticResistanceCount']],
                ['Transmembrane Proteins', data['MAGVirusesTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'unMAGArchaea',
            data: [
                ['Taxonomy', data['unMAGArchaeaTaxonomyCount']],
                ['Protein', data['unMAGArchaeaProteinCount']],
                ['tRNA', data['unMAGArchaeaTrnaCount']],
                ['CRISPR/Cas Systems', data['unMAGArchaeaCRISPRCount']],
                ['Anti-CRISPR', data['unMAGArchaeaAntiCRISPRAnnotationCount']],
                ['Secondary Metabolites', data['unMAGArchaeaSecondaryMetaboliteRegionCount']],
                ['Signal Peptides', data['unMAGArchaeaSignalPeptidePredictionCount']],
                ['Virulence Factors', data['unMAGArchaeaVirulenceFactorCount']],
                ['Antibiotic Resistance Genes', data['unMAGArchaeaAntibioticResistanceCount']],
                ['Transmembrane Proteins', data['unMAGArchaeaTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'unMAGBacteria',
            data: [
                ['Taxonomy', data['unMAGBacteriaTaxonomyCount']],
                ['Protein', data['unMAGBacteriaProteinCount']],
                ['tRNA', data['unMAGBacteriaTrnaCount']],
                ['CRISPR/Cas Systems', data['unMAGBacteriaCRISPRCount']],
                ['Anti-CRISPR', data['unMAGBacteriaAntiCRISPRAnnotationCount']],
                ['Secondary Metabolites', data['unMAGBacteriaSecondaryMetaboliteRegionCount']],
                ['Signal Peptides', data['unMAGBacteriaSignalPeptidePredictionCount']],
                ['Virulence Factors', data['unMAGBacteriaVirulenceFactorCount']],
                ['Antibiotic Resistance Genes', data['unMAGBacteriaAntibioticResistanceCount']],
                ['Transmembrane Proteins', data['unMAGBacteriaTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'unMAGFungi',
            data: [
                ['Taxonomy', data['unMAGFungiTaxonomyCount']],
                ['Protein', data['unMAGFungiProteinCount']],
                ['tRNA', data['unMAGFungiTrnaCount']],
                ['Secondary Metabolites', data['unMAGFungiSecondaryMetaboliteRegionCount']],
                ['Signal Peptides', data['unMAGFungiSignalPeptidePredictionCount']],
                ['Virulence Factors', data['unMAGFungiVirulenceFactorCount']],
                ['Antibiotic Resistance Genes', data['unMAGFungiAntibioticResistanceCount']],
                ['Transmembrane Proteins', data['unMAGFungiTransmembraneHelicesCount']]
            ]
        },
        {
            dataGroupId: 'unMAGViruses',
            data: [
                ['Taxonomy', data['unMAGVirusesTaxonomyCount']],
                ['Protein', data['unMAGVirusesProteinCount']],
                ['tRNA', data['unMAGVirusesTrnaCount']],
                ['CRISPR/Cas Systems', data['unMAGVirusesCRISPRCount']],
                ['Anti-CRISPR', data['unMAGVirusesAntiCRISPRAnnotationCount']],
                ['Virulence Factors', data['unMAGVirusesVirulenceFactorCount']],
                ['Antibiotic Resistance Genes', data['unMAGVirusesAntibioticResistanceCount']],
                ['Transmembrane Proteins', data['unMAGVirusesTransmembraneHelicesCount']]
            ]
        },
    ]
}

export default MicrobeStatisticBarChart
